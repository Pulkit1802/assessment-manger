import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    program: async (_: any, args: any) => {
        const {where} = args || {};

        const program = prisma.program.findFirst({
            where,
            include: {
                dept: true,
                programCourses: true,
                reports: true,
                sections: true,
            }
        });

        if (!program) throw new ApiError(404, "Program not found");
        
        return program;

    },
    programs: async (_: any, args: any) => {
        const {where} = args || {};

        const programs = prisma.program.findMany({
            where,
            include: {
                dept: true,
                programCourses: true,
                reports: true,
                sections: true,
            }
        });

        return programs;
    }
}