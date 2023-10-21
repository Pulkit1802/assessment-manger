import { prisma } from "../../../config";

export const fields = {
    Test: {
        parts: async (parent: any, _: any) => {
            return prisma.part.findMany({
                where: {
                    testId: parent.id
                },
                include: {
                    questions: true,
                }
            })
        },

        marking: async (parent: any, _: any) => {
            return prisma.marking.findMany({
                where: {
                    testId: parent.id,
                },
                include: {
                    questionWiseMarksObtained: true,
                }
            })
        },

        reports: async (parent: any, _: any) => {
            return prisma.report.findMany({
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