import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const queries = {
    report: async (_: any, args: any) => {
        const {where} = args || {}

        console.log(where)

        const report = await prisma.report.findFirst({
            where
        })

        if (!report)
            throw new ApiError(404, 'Report Not Found');

        return report;
    },
    reports: async (_: any, args: any) => {
        const {where} = args || {}

        // console.log('report', where);
        console.log(where);

        const reports = await prisma.report.findMany({
            where
        });

        // console.log(reports);

        return reports;

    }
}