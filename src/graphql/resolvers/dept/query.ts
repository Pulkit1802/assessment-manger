import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    dept: async (_: any, args: any) => {
        const { where } = args || {};

        const dept = prisma.dept.findUnique({
            where,
        });

        if (!dept) 
            throw new ApiError(404, "Dept not found");
        
        return dept;

    },

    depts: async (_: any, args: any) => {
        return await prisma.dept.findMany();
    },

    searchDepts: async (_: any, args: any) => {
        const {name} = args || {};

        return await prisma.dept.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });
        
    }
}