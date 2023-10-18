import { prisma } from "../../../config";

export const fields = {
    Student: {
        sections: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    students: {
                        some: {
                            id: parent.id
                        }
                    }
                },
            });
        },
        fa: async (parent: any, _: any) => {
            return await prisma.user.findFirst({
                where: {
                    id: parent.faId
                }
            });
        },
        dept: async (parent: any, _: any) => {
            return await prisma.dept.findFirst({
                where: {
                    id: parent.deptId
                }
            });
        },
        courses: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    students: {
                        some: {
                            id: parent.id
                        }
                    }
                },
                select: {
                    course: true
                }
            });
        },
        teachers: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    students: {
                        some: {
                            id: parent.id
                        }
                    }
                },
                select: {
                    faculty: true
                }
            });
        }
    }
}