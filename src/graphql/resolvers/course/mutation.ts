import { prisma } from "../../../config";

export const mutations = {
    createCourse: async (_: any, args: any) => {
        const { data, mapData } = args;

        let course = await prisma.course.create({
            data
        });

        if (mapData && mapData.programIds.length > 0) {
            course = await prisma.course.update({
                where: {
                    id: course.id
                },
                data: {
                    program: {
                        connect: mapData.programIds.map((id: any) => {
                            return {
                                id
                            }
                        })
                    }
                },
            });
        }

        return course;

    },
    updateCourse: async (_: any, args: any) => {
        const { data, where } = args;

        return await prisma.course.update({
            data,
            where
        });
    },
    deleteCourse: async (_: any, args: any) => {
        const { where } = args;

        return await prisma.course.delete({
            where
        });
    },
    attachPrograms: async (_: any, args: any) => {
        const {where, mapData} = args;

        const course = await prisma.course.update({
            where,
            data: {
                program: {
                    connect: mapData.programIds.map((id: any) => {
                        return {
                            id
                        }
                    })
                }
            },
        });

        return course;

    }
}