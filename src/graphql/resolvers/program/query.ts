import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    program: async (_: any, args: any) => {
        const {where} = args || {};

        const program = prisma.program.findFirst({
            where,
        });

        if (!program) throw new ApiError(404, "Program not found");
        
        return program;

    },

    programs: async (_: any, args: any) => {
        const { where } = args || {};

        const programs = prisma.program.findMany({
            where,
        });

        return programs;
    }
}