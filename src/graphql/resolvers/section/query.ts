import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    section: async (_: any, args: any, ctx: any) => {
        const {where} = args;

        if (!ctx.user) throw new ApiError(401, "Unauthorized");

        if (!where || !where.id)
            throw new ApiError(400, "Section id not provided");

        const section = prisma.section.findFirst({
            where: {
                // facultyId: ctx.user.id,
                ...where
            },
        });

        if (!section) throw new ApiError(404, "Section not found");
        
        return section;

    },
    sections: async (_: any, args: any, ctx: any) => {

        console.log(args, ctx)

        // if (!ctx.user) throw new ApiError(401, "Unauthorized");

        const {where} = args || {};

        console.log(where);

        const sections = prisma.section.findMany({
            where: {
                facultyId: ctx.user.id,
                ...where
            },
        });

        return sections;
    }
}