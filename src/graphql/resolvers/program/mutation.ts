import { prisma } from "../../../config";

export  const mutations = {
    createProgram: async (_: any, args: any) => {
        const { data, mapData } = args || {};

        let courses;

        if (mapData)
            courses = mapData.courseIds.map((id: any) => {
                return {
                    id
                }
            });
        else
            courses = [];

        let program = await prisma.program.create({
            data: {
                programCourses: {
                    connect: courses,
                },
                ...data
            }
        });

        return program;

    },
    updateProgram: async (_: any, args: any) => {
        const { data, where } = args;

        return await prisma.program.update({
            data,
            where
        });
    },
    deleteProgram: async (_: any, args: any) => {
        const { where } = args;

        return await prisma.program.delete({
            where
        });
    },
    attachCourses: async (_: any, args: any) => {

        const {where, mapData} = args;

        const program = await prisma.program.update({
            where,
            data: {
                programCourses: {
                    connect: mapData.courseIds.map((id: any) => {
                        return {
                            id
                        }
                    })
                }
            }
        });

        return program;

    }
}