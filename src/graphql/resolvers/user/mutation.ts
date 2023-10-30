import { prisma } from "../../../config";
import bcrypt from 'bcrypt';
import ApiError from "../../../utils/apiError";
import { filePath } from "../../../config";
import xlsx from 'xlsx';

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
    uploadUsers: async (_: any, args: any) => {

        const { fileName } = args;
        const workbook = xlsx.readFile(filePath + fileName);
        const userData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        const emails: string[] = []
        const phoneNumbers: string[] = []

        userData.forEach((user: any) => {
            emails.push(user.email);
            phoneNumbers.push(user.phoneNumber);
        });

        const alreadyUsers = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            in: emails
                        }
                    },
                    {
                        phoneNumber: {
                            in: phoneNumbers
                        }
                    }
                ]
            },
            select: {
                email: true,
                phoneNumber: true,
            }
        });

        if (alreadyUsers.length > 0) {
            alreadyUsers.forEach((user) => {
                while (true) {
                    const index = userData.findIndex((u: any) => u.email === user.email || u.phoneNumber === user.phoneNumber);
                    if (index === -1) break;
                    userData.splice(index, 1);
                }
            })
        }

        const users = await prisma.user.createMany({
            // @ts-ignore
            data: userData
        })

        return users;

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