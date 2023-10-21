import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const queries = {
    report: async (_: any, args: any) => {
        const {where} = args || {}

        const report = await prisma.report.findFirst({
            where
        })

        if (!report)
            throw new ApiError(404, 'Report Not Found');

        return report;
    },
    reports: async (_: any, args: any) => {
        const {where} = args || {}

        return prisma.report.findMany({where});

    }
}