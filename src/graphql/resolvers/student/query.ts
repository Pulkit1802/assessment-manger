import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    student: async (_: any, args: any) => {
        const {where} = args;

        const student = prisma.student.findFirst({
            where,
        });

        if (!student) throw new ApiError(404, "Student not found");
        
        return student;

    },
    
    students: async (_: any, args: any) => {
        const {where} = args;

        console.log(where);

        const students = prisma.student.findMany({
            where,
        });

        return students;
    }
}