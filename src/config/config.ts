import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import z from 'zod';

dotenv.config({ path: './.env' });

const envSchema = z.object({
    PORT: z.string().default("5000"),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    DATABASE_URL: z.string(),
})

let prisma: PrismaClient;

try {
    prisma = new PrismaClient();
    console.log('Prisma connected');
} catch (error) {
    process.exit(1);
}

const env = envSchema.safeParse(process.env);

if (!env.success) {
    throw new Error(
        env.error.issues
        .map((error) => `${error.path} ${error.message}`)
        .join('\n')
    );
}


export default {
    port: env.data.PORT,
    env: env.data.NODE_ENV,
    prisma
}