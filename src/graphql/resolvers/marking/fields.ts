import { prisma } from "../../../config";

export const fields = {
    Marking: {
        questionWiseMarksObtained: async (parent: any, _: any) => {
            return await prisma.questionMarking.findMany({
                where: {
                    markingId: parent.id
                },
                include: {
                    question: true
                }
            });
        },
        section: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    id: parent.sectionId
                }
            })
        },
        student: async (parent: any, _: any) => {
            return await prisma.student.findUnique({
                where: {
                    id: parent.studentId
                }
            })
        }
    }
}