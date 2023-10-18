import { prisma } from "../../../config";

export const queries = {
    test: async (_: any, args: any) => {
        const { where } = args || {};
        const test = await prisma.test.findUnique({
            where,
            include: {
                parts: {
                    include: {
                        questions: true,
                    },
                },
            },
        });
        return test;
    }
};