import { prisma } from "../../../config";

export  const mutations = {
    createProgram: async (_: any, args: any) => {
        const { data, mapData } = args;

        let program = await prisma.program.create({
            data
        });

        if (mapData && mapData.courseIds.length > 0) {

            const courseList = mapData.courseIds.map((id: any) => {
                return {
                    id
                }
            })

            program = await prisma.program.update({
                where: {
                    id: program.id
                },
                data: {
                    programCourses: {
                        connect: courseList,
                    }
                },
            })
        }
        
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

        const courseList = mapData.courseIds.map((id: any) => {
            return {
                id
            }
        })

        return await prisma.program.update({
            where,
            data: {
                programCourses: {
                    connect: courseList,
                }
            }
        });

    }
}