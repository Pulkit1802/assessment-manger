import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const queries = {
    student: async (_: any, args: any) => {
        const {where} = args;

        const student = prisma.student.findFirst({
            where,
            include: {
                sections: true,
                fa: true,
                dept: true,
                marks: true
            }
        });

        if (!student) throw new ApiError(404, "Student not found");
        
        return student;

    },
    
    students: async (_: any, args: any) => {
        const {where} = args;

        const students = prisma.student.findMany({
            where,
            include: {
                sections: true,
                fa: true,
                dept: true,
                marks: true
            }
        });

        return students;
    }
}