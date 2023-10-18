import { prisma } from "../../../config";

export const fields = {
    Program: {
        dept: async (parent: any, _: any) => {
            return await prisma.dept.findFirst({
                where: {
                    id: parent.deptId
                }
            });
        },
        sections: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    programId: parent.id
                }
            });
        },
        students: async (parent: any, _: any) => {
            return await prisma.student.findMany({
                where: {
                    sections: {
                        some: {
                            programId: parent.id
                        }
                    }
                },
            });
        },
        programCourses: async (parent: any, _: any) => {
            return await prisma.course.findMany({
                where: {
                    program: {
                        some: {
                            id: parent.id
                        }
                    }
                },
            });
        }
    }
}