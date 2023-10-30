import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../../config";

export const queries = {
    user: async (_: any, args: any, ctx: any) => {

        const user = await prisma.user.findUnique({
            where: {
                id: ctx.user.id
            }
        });

        if (!user) 
            throw new ApiError(404, 'User not found');

        // @ts-ignore
        delete user.password;

        return user;
    },
    users: async (_:any, args: any, context: any) => {
        
        console.log(context.user);

        const { where } = args;

        return await prisma.user.findMany({
            where,
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

        const token = jwt.sign(user, config.secret, { expiresIn: '2h' });

        return {
            user,
            token
        }

    }
}