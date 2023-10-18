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
    courses: async (_: any, args: any) => {
        const {where} = args;

        const courses = prisma.course.findMany({
            where,
        });

        return courses;
    }
}