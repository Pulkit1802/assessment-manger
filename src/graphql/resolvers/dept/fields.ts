import { prisma } from "../../../config";

export const fields = {
    Dept: {
        users: async (parent: any, args: any) => {

            const { where } = args || {};

            return await prisma.user.findMany({
                where: {
                    deptId: parent.id,
                    ...where,
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
        sections: async (parent: any, args: any) => {

            const {where} = args || {};

            return await prisma.program.findMany({
                where: {
                    deptId: parent.id,
                    ...where,
                },
                select: {
                    sections: true
                }
            });
        },
        students: async (parent: any, args: any) => {

            const { where } = args || {};

            return await prisma.student.findMany({
                where: {
                    deptId: parent.id,
                    ...where,
                },
            });
        }
    }
}