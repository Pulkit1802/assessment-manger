import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../../config";

export const queries = {
    user: async (_: any, args: any) => {

        const { id, email } = args || {};

        const user = await prisma.user.findUnique({
            where: {
                id,
                email
            }
        });

        if (!user) 
            throw new ApiError(404, 'User not found');

        // @ts-ignore
        delete user.password;

        return user;
    },

    me: async (_: any, args: any, ctx: any) => {
        return await prisma.user.findUnique({
            where: {
                id: ctx.user.id
            }
        })
    },

    searchUsers: async (_:any, args: any) => {
        
        const { email, name, dept } = args;

        const where: any = {AND: []};

        if (email)
            where.AND.push({
                email: {
                    contains: email,
                    mode: 'insensitive'
                }
            })

        if (name)
            where.AND.push({
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            })

        return await prisma.user.findMany({
            where
        });
    },

    login: async (_: any, args: any) => {

        const {email, password} = args;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) 
            throw new ApiError(404, 'User not found');

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            throw new ApiError(400, 'Invalid username or password');

        // @ts-ignore
        delete user.password;
        // @ts-ignore
        delete user.createdAt;
        // @ts-ignore
        delete user.updatedAt;

        const token = jwt.sign(user, config.secret, {expiresIn: '1d'});

        return {
            user,
            token
        }

    },

    userWatingForApproval: async (_: any, args: any, ctx: any) => {

        // const where = ctx.user.role === 'admin' ? {} : {
            // deptId: ctx.user.deptId
        // }

        const users = await prisma.waiting_approval.findMany();

        return users;
    }
    
}