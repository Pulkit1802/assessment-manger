import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createSection: async (_: any, args: any) => {
        const {data} = args;
        console.log("hello");

        // const program = await prisma.program.findFirst({
        //     where: {
        //         id: data.programId,
        //         programCourses: {
        //             some: {
        //                 code: data.courseCode
        //             }
        //         }
        //     }
        // });

        // if (!program)
        //     throw new ApiError(400, 'Course Not Found In Program')

        try {
            const section = await prisma.section.create({
                data: {
                    roomNo: data.roomNo,
                    batch: data.batch,
                    semester: data.semester,
                    program: {
                        connect: {
                            id: data.programId
                        }
                    },
                    course: {
                        connect: {
                            code: data.courseCode
                        }
                    },
                    faculty: {
                        connect: {
                            email: data.facultyEmail
                        }
                    },
    
                }
            });
    
            return section;
        } catch (error) {
            console.log(error);
            return null
        }

        
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