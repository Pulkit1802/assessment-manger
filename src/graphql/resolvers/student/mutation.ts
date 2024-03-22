import { prisma } from "../../../config";

export const mutations = {
    createStudent: async (_: any, args: any) => {

        try {
            const {data} = args;

            console.log(data);

            const student = await prisma.student.createMany({
                data
            });

            return student;

        } catch (error) {
            console.log(error);
            throw new Error('An error occurred while creating student');
        }
        
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