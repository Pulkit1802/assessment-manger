import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

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
            return await prisma.user.findMany({
                where: {
                    id: parent.studentId
                }
            })
        }
    }
}