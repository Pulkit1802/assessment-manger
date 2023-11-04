import { prisma } from "../../../config";

export const mutations = {
    createDept: async (_: any, args: any) => {
        const { data } = args;
        console.log(data);
        return await prisma.dept.create({
            data
        });
    },

    updateDept: async (_: any, args: any) => {
        const { id, data } = args;

        return await prisma.dept.update({
            where: {
                id
            },
            data
        });
    },

    deleteDept: async (_: any, args: any) => {
        const { id } = args;

        return await prisma.dept.delete({
            where: {
                id
            }
        });
    }
}