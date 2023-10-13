import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    section: async (_: any, args: any) => {
        const {where} = args;

        const section = prisma.section.findFirst({
            where,
            include: {
                students: true,
                course: true,
                faculty: true,
                markings: true,
                program: true,
                reports: true,
            }
        });

        if (!section) throw new ApiError(404, "Section not found");
        
        return section;

    },
    sections: async (_: any, args: any) => {
        const {where} = args;

        const sections = prisma.section.findMany({
            where,
            include: {
                students: true,
                course: true,
                faculty: true,
                markings: true,
                program: true,
                reports: true,
            }
        });

        return sections;
    }
}