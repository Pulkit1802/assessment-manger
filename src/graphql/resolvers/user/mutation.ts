import { prisma } from "../../../config";
import bcrypt from 'bcrypt';
import ApiError from "../../../utils/apiError";

export const mutations = {
    createUser: async (_: any, args: any) => {

        const { data } = args;

        data.password = await bcrypt.hash(data.password, 10);

        const user = prisma.user.create({
            data
        });

        // @ts-ignore
        delete user.password;

        return user;
    },
    updateUser: async (_: any, args: any) => {

        const { where, data } = args;

        const user = await prisma.user.update({
            where,
            data
        });

        if (!user) 
            throw new ApiError(404, 'User not found');

        // @ts-ignore
        delete user.password;

        return user;
    },
    deleteUser: async (_any: any, args: any) => {
        const { where } = args;
        return await prisma.user.delete({ where });
    }
}