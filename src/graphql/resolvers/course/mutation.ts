import { prisma } from "../../../config";

export const mutations = {
    createCourse: async (_: any, args: any) => {
        const { data, mapData } = args;

        // console.log("data", data);

        const cordinator = await prisma.user.findUnique(
            {
                "where": {
                    "email": data.cordinatorEmail
                }
            }
        )

        console.log("cordinator", !cordinator);

        if (!cordinator) {
            throw new Error("Invalid Cordinator Email");
        }

        if (!cordinator.role.includes('cc')) {
            throw new Error("Invalid Cordinator Role");
        }

        let course = await prisma.course.create({
            "data": {
                "cordinatorId": cordinator.id,
                "code": data.code,
                "name": data.name,
            }
        });

        if (mapData && mapData.programIds.length > 0) {

            const programList = mapData.programIds.map((id: any) => {
                return {
                    id
                }
            });

            course = await prisma.course.update({
                where: {
                    id: course.id
                },
                data: {
                    program: {
                        connect: programList
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

        const programList = mapData.programIds.map((id: any) => {
            return {
                id
            }
        })

        const course = await prisma.course.update({
            where,
            data: {
                program: {
                    connect: programList,
                }
            },
        });

        return course;

    }
}