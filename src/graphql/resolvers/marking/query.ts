import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const queries = {
    marking: async (_: any, args: any) => {
        const { where } = args || {};
        const marking = await prisma.marking.findUnique({
            where,
            include: {
                questionWiseMarksObtained: {
                    include: {
                        question: true,
                    },
                },
            },
        });
        return marking;
    },
    markings: async (_: any, args: any) => {
        const { where } = args || {};
        const marking = await prisma.marking.findMany({
            where,
            include: {
                questionWiseMarksObtained: {
                    include: {
                        question: true,
                    }
                }
            }
        });
        return marking;
    }
};