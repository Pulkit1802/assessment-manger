import { prisma } from "../../../config";

export const fields = {
    Test: {
        parts: async (parent: any, _: any) => {
            return await prisma.part.findMany({
                where: {
                    testId: parent.id
                },
                include: {
                    questions: true,
                }
            })
        },

        marking: async (parent: any, _: any) => {
            return await prisma.marking.findMany({
                where: {
                    testId: parent.id,
                },
                include: {
                    questionWiseMarksObtained: true,
                }
            })
        },

        reports: async (parent: any, _: any) => {
            return await prisma.report.findMany({
                where: {
                    testId: parent.id,
                },
                include: {
                    questionsReport: true,
                }
            })
        }
    }
}