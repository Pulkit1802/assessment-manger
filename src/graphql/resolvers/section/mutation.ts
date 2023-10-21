import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createSection: async (_: any, args: any) => {
        const {data} = args;

        const program = prisma.program.findFirst({
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
            throw new ApiError(400, 'Program Don\'t offer this Course')

        const section = prisma.section.create({
            data
        });

        return section;
    },
    
    updateSection: async (_: any, args: any) => {
        const {where, data} = args;

        const section = prisma.section.update({
            where,
            data
        });

        return section;
    },

    deleteSection: async (_: any, args: any) => {
        const {where} = args;

        const section = prisma.section.delete({
            where
        });

        return section;
    },

    attachStudents: async (_: any, args: any) => {
        const {where, mapData} = args;

        const connectionList = mapData.studentIds.map((id: any) => {
            return {
                id
            }
        })

        console.log(connectionList)

        const section = prisma.section.update({
            where,
            data: {
                students: {
                    connect: connectionList
                }
            },
            include: {
                students: true
            }
        });

        return section;
    }
}