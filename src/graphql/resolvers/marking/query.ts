import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const queries = {
    marking: async (_: any, args: any) => {
        const { where } = args;
        const marking = await prisma.marking.findUnique({
            where,
        });

        if (!marking) 
            throw new ApiError(404, "Marking not found");
        
        return marking;
    },
    markings: async (_: any, args: any) => {
        const { where } = args || {};
        const marking = await prisma.marking.findMany({
            where,
        });
        return marking;
    }
};