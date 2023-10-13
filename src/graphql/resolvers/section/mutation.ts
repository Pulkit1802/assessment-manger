import { prisma } from "../../../config";

export const mutations = {
    createSection: async (_: any, args: any) => {
        const {data} = args;

        const section = prisma.section.create({
            data
        });

        return section;
    },
    
    updateSection: async (_: any, args: any) => {
        const {where, data} = args;

        const section = prisma.section.update({
            where,
            data
        });

        return section;
    },
    
    deleteSection: async (_: any, args: any) => {
        const {where} = args;

        const section = prisma.section.delete({
            where
        });

        return section;
    }
}