import { prisma } from "../../../config";

export const fields = {
    Section: {
        course: async (parent: any, _: any) => {
            return await prisma.course.findFirst({
                where: {
                    id: parent.courseId
                }
            });
        },
        program: async (parent: any, _: any) => {
            return await prisma.program.findFirst({
                where: {
                    id: parent.programId
                }
            });
        },
        faculty: async (parent: any, _: any) => {
            return await prisma.user.findFirst({
                where: {
                    id: parent.facultyId
                }
            });
        },
        students: async (parent: any, _: any) => {
            return await prisma.student.findMany({
                where: {
                    sections: {
                        some: {
                            id: parent.id
                        }
                    }
                },
            });
        }
    }
}