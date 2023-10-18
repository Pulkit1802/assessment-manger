import { prisma } from '../../../config'

export const fields = {
    User: {
        dept: async (parent: any, _: any) => {
            return await prisma.dept.findFirst({
                where: {
                    id: parent.deptId
                }
            });
        },
        cordinatedCourses: async (parent: any, _: any) => {
            return await prisma.course.findMany({
                where: {
                    cordinatorId: parent.id
                }
            });
        },
        cordinatedPrograms: async (parent: any, _: any) => {
            return await prisma.program.findMany({
                where: {
                    cordinatorId: parent.id
                }
            });
        },
        sections: async (parent: any, _: any) => {
            return await prisma.section.findMany({
                where: {
                    facultyId: parent.id
                }
            });
        },
        students: async (parent: any, _: any) => {
            return await prisma.student.findMany({
                where: {
                    faId: parent.id
                }
            });
        },
        // sectionStudents: async (parent: any, _: any) => {
        //     return await prisma.section.findMany({
        //         where: {
        //             facultyId: parent.id
        //         },
        //         select: {
        //             students: true
        //         }
        //     });
        // }
    }
}