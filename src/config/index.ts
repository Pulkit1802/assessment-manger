import dotenv from 'dotenv';
import z from 'zod';
import path from 'path';
import { MeiliSearch } from 'meilisearch'

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
export const filePath = path.join(__dirname, '../../uploads/');
dotenv.config({ path: './.env' });

const envSchema = z.object({
    PORT: z.string().default("5000"),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    MEILISEARCH_MASTER_KEY: z.string(),
    MEILI_URL: z.string()
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
    throw new Error(
        env.error.issues
        .map((error) => `${error.path} ${error.message}`)
        .join('\n')
    );
}

export const searchClient = new MeiliSearch({
    host: env.data.MEILI_URL,
    apiKey: env.data.MEILISEARCH_MASTER_KEY,
});

export default {
    port: env.data.PORT,
    env: env.data.NODE_ENV,
    secret: env.data.JWT_SECRET,
}