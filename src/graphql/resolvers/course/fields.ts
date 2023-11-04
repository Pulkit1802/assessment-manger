import { prisma } from "../../../config";

export const fields = {
    Course: {
        program: async (parent: any, _: any) => {
            return await prisma.program.findMany({
                where: {
                    programCourses: {
                        some: {
                            id: parent.id
                        }
                    }
                },
            });
        },
        // sections: async (parent: any, _: any) => {
        //     return await prisma.section.findMany({
        //         where: {
        //             courseId: parent.id
        //         }
        //     });
        // },
        cordinator: async (parent: any, _: any) => {
            return await prisma.user.findUnique({
                where: {
                    id: parent.cordinatorId
                }
            });
        },
        students: async (parent: any, _: any) => {
            const sections = await prisma.section.findMany({
                where: {
                    courseId: parent.id
                },
                select: {
                    students: true
                }
            });

            if (!sections) return [];

            return sections.map((s: any) => s.students);

        },
        faculty: async (parent: any, _: any) => {
            const sections = await prisma.section.findMany({
                where: {
                    courseId: parent.id
                },
                select: {
                    faculty: true
                }
            });

            if (!sections) return [];

            return sections.map((s: any) => s.faculty);
        },
        tests: async (parent: any, _: any) => {
            const tests = await prisma.test.findMany({
                where: {
                    courseId: parent.id
                }
            });

            tests.forEach((t: any) => {
                t.markUploadDeadLine = `${t.markUploadDeadLine}`;
            });

            return tests
        }
    }
}