import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    program: async (_: any, args: any) => {
        const {where} = args;

        const program = prisma.program.findUnique({
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
    },

    searchPrograms: async (_: any, args: any) => {

        const { name, dept } = args;

        const where: any = {AND: []};

        if (name)
            where.AND.push({
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            })

        if (dept)
            where.AND.push({
                dept: {
                    equals: dept,
                }
            })

        return await prisma.program.findMany({
            where
        });

    }
}