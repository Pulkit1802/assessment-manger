import { prisma } from "../../../config";

export const mutations = {
    createStudent: async (_: any, args: any) => {
        const {data} = args;

        const student = await prisma.student.create({
            data
        });

        return student;
    },
    
    updateStudent: async (_: any, args: any) => {
        const {where, data} = args;

        return await prisma.student.update({
            where,
            data
        });

    },
    
    deleteStudent: async (_: any, args: any) => {
        const {where} = args;

        return await prisma.student.delete({
            where
        });

    },

    attachSections: async (_: any, args: any) => {
        const {where, mapData} = args;

        const sectionList = mapData.sectionIds.map((id: any) => {
            return {
                id
            }
        })

        return await prisma.student.update({
            where,
            data: {
                sections: {
                    connect: sectionList
                }
            }
        });
    }
}