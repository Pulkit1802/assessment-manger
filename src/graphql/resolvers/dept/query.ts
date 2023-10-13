import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    dept: async (_: any, args: any) => {
        const {where} = args;

        const dept = prisma.dept.findFirst({
            where,
            include: {
                programs: true,
                users: true,
            }
        });

        if (!dept) throw new ApiError(404, "Dept not found");
        
        return dept;

    },
    
    depts: async (_: any, args: any) => {
        const {where} = args;

        const depts = prisma.dept.findMany({
            where,
            include: {
                programs: true,
                users: true,
            }
        });

        return depts;
    }
}