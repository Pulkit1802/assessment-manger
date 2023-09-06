import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({path: './.env'});

let prisma: PrismaClient;

try {
    prisma = new PrismaClient();
    console.log("Prisma connected");
} catch (error) {
    process.exit(1);
}

export default {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || "dev",
    prisma
}