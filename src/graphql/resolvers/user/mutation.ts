import { prisma } from "../../../config";
import bcrypt from 'bcrypt';
import ApiError from "../../../utils/apiError";
import { date } from "zod";

export const mutations = {
    createUser: async (_: any, args: any) => {

        const { data } = args || {};

        data.password = await bcrypt.hash(data.password, 10);

        const user = prisma.user.create({
            data
        });

        // @ts-ignore
        delete user.password;

        return user;
    },

    register: async (_: any, args: any) => {
        const { data } = args || {};

        const checkUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (checkUser)
            throw new ApiError(400, 'User already exists');
        
        data.password = await bcrypt.hash(data.password, 10);

        const user = await prisma.waiting_approval.create({
            data
        });

        // @ts-ignore
        delete user.password;

        return user;
    },

    approveUser: async (_: any, args: any) => {
        const { id } = args || {};

        console.log(id)

        const user = await prisma.waiting_approval.findUnique({
            where: {
                id
            }, 
            select: {
                email: true,
                name: true,
                password: true,
                phoneNumber: true,
                role: true,
                deptId: true,
            }
        });

        if (!user)
            throw new ApiError(404, 'User not found');

        await prisma.user.create({
            data: user
        });

        await prisma.waiting_approval.delete({
            "where": {
                "email": user.email
            }
        })

        return true;

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
        return await prisma.user.deleteMany({ where });
    }
}