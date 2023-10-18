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
            return await prisma.section.findMany({
                where: {
                    programId: parent.id
                },
                select: {
                    students: true
                }
            });
        },
        programCourses: async (parent: any, _: any) => {
            return await prisma.program.findFirst({
                where: {
                    id: parent.id
                },
                select: {
                    programCourses: true
                }
            });
        }
    }
}