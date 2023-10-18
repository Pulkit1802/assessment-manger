import { prisma } from "../../../config";

export const fields = {
    Course: {
        program: async (parent: any, _: any) => {
            return await prisma.course.findMany({
                where: {
                    id: parent.id
                },
                select: {
                    program: true
                }
            });
        },
        sections: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    courseId: parent.id
                }
            });
        },
        cordinator: async (parent: any, _: any) => {
            return await prisma.course.findUnique({
                where: {
                    id: parent.id
                },
                select: {
                    cordinator: true
                }
            });
        },
        students: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    courseId: parent.id
                },
                select: {
                    students: true
                }
            });
        },
        users: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    courseId: parent.id
                },
                select: {
                    faculty: true
                }
            });
        }
    }
}