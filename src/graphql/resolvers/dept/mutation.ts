import { prisma } from "../../../config";

export const mutations = {
    createDept: async (_: any, args: any) => {
        const { data } = args;

        return await prisma.dept.create({
            data
        });
    },
    updateDept: async (_: any, args: any) => {
        const { data, where } = args;

        return await prisma.dept.update({
            data,
            where
        });
    },
    deleteDept: async (_: any, args: any) => {
        const { where } = args;

        return await prisma.dept.delete({
            where
        });
    }
}