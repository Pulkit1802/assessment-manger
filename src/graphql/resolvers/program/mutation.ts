import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createProgram: async (_: any, args: any, ctx: any) => {
        const { data, mapData } = args;

        console.log(data);

        // const dept = await prisma.dept.findUnique({
        //     where: {
        //         id: ctx.user.deptId
        //     }, select: {
        //         id: true
        //     }
        // });

        // if (!dept) throw new ApiError(500, 'Serious Problem');

        let program = await prisma.program.create({
            data: {
                name: data.name,
                dept: {
                    connect: {
                        id: data.deptId
                    }
                },
                cordinator: {
                    connect: {
                        email: data.cordinatorEmail
                    }
                }
            }
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