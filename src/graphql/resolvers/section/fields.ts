import { prisma } from "../../../config";

const fields = {
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
            return await prisma.section.findFirst({
                where: {
                    id: parent.id
                },
                select: {
                    students: true
                }
            });
        }
    }
}