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
        const { where } = args?.where || {};

        const depts = prisma.dept.findMany({
            where,
        });

        return depts;
    }
}