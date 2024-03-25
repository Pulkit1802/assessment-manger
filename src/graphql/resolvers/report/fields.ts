import { prisma } from "../../../config";

export const fields = {
    Report: {
        questionsReport: async (parent: any, _: any) => {
            return await prisma.questionReport.findMany({
                where: {
                    reportId: parent.id
                },
                include: {
                    "question": {
                        include: {
                            "part": true
                        }
                    }
                }
            })
        },
        section: async (parent: any, _: any) => {
            return await prisma.section.findFirst({
                where: {
                    reports: {
                        some: {
                            id: parent.id
                        }
                    }
                }
            })
        }
    }
    
}