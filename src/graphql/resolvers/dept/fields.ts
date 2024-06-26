import { prisma } from "../../../config";

export const fields = {
    Dept: {
        users: async (parent: any, _: any) => {
            return await prisma.user.findMany({
                where: {
                    deptId: parent.id,
                }
            });
        },
        
        programs: async (parent: any, _: any) => {
            return await prisma.program.findMany({
                where: {
                    deptId: parent.id
                }
            });
        },

        sections: async (parent: any, _: any) => {

            const programs = await prisma.program.findMany({
                where: {
                    deptId: parent.id,
                },
                select: {
                    sections: true
                }
            });

            const sections : any[] = [];
            programs.forEach((program: any) => {
                sections.push(program.sections);
            })

            return sections;

        },
        
        students: async (parent: any, _: any) => {
            return await prisma.student.findMany({
                where: {
                    deptId: parent.id,
                },
            });
        }
    }
}