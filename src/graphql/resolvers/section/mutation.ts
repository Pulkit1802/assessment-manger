import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createSection: async (_: any, args: any) => {
        const {data} = args;

        const program = await prisma.program.findFirst({
            where: {
                id: data.programId,
                programCourses: {
                    some: {
                        id: data.courseId
                    }
                }
            }
        });

        if (!program)
            throw new ApiError(400, 'Course Not Found In Program')

        const section = await prisma.section.create({
            data
        });

        return section;
    },
    
    updateSection: async (_: any, args: any) => {
        const {where, data} = args;

        return await prisma.section.update({
            where,
            data
        });

    },

    deleteSection: async (_: any, args: any) => {
        const {where} = args;

        return await prisma.section.delete({
            where
        });

    },

    attachStudents: async (_: any, args: any) => {
        const {where, mapData} = args;

        const studentsList = mapData.studentIds.map((id: any) => {
            return {
                id
            }
        })

        return await prisma.section.update({
            where,
            data: {
                students: {
                    connect: studentsList
                }
            },
            include: {
                students: true
            }
        });

    }
}