import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    course: async (_: any, args: any) => {
        const {where} = args;

        const course = prisma.course.findFirst({
            where,
        });

        if (!course) throw new ApiError(404, "Course not found");
        
        return course;

    },

    courses: async (_: any, args: any, ctx: any) => {
        const {where} = args || {};

        const courses = prisma.course.findMany({
            where: {
                cordinatorId: ctx.user.id,
                ...where                
            }
        });

        return courses;
    },

    searchCourses: async (_: any, args: any) => {
        
        const {name, code} = args;
        
        let where: any = {AND: []};

        if (name)
            where.AND.push({
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            })

        if (code)
            where.AND.push({
                code: {
                    contains: code,
                    mode: 'insensitive'
                }
            })

        if (!where.AND.length)
            where = {}

        return await prisma.course.findMany({
            where
        });

    }
}