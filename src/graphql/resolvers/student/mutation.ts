import { prisma } from "../../../config";

export const mutations = {
    createStudent: async (_: any, args: any) => {
        const {data} = args;

        const student = prisma.student.create({
            data
        });

        return student;
    },
    
    updateStudent: async (_: any, args: any) => {
        const {where, data} = args;

        const student = prisma.student.update({
            where,
            data
        });

        return student;
    },
    
    deleteStudent: async (_: any, args: any) => {
        const {where} = args;

        const student = prisma.student.delete({
            where
        });

        return student;
    }
}