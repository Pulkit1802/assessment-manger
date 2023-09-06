import exp from "constants";
import configs from "../config/config";
import { PrismaClient } from "@prisma/client";

const { prisma } = configs;

export const prismaCreate = async (
    model: keyof PrismaClient, 
    data: any,
    options: any
    ) => {

        // @ts-ignore
        const res = await prisma[model].create({
            data,
            ...options
        })

        return res;

}

export const prismaCreateMany = async (
    model: keyof PrismaClient,
    data: any,
    options: any
    ) => {
            
        // @ts-ignore
        const res = await prisma[model].createMany({
            data,
            ...options
        })

        return res;

}

export const prismaFindUnique = async (
    model: keyof PrismaClient,
    where: any,
    options: any
    ) => {
        
        // @ts-ignore
        const res = await prisma[model].findUnique({
            where,
            ...options
        })

        return res;

}

export const prismaFindMany = async (
    model: keyof PrismaClient,
    where: any,
    options: any
    ) => {

        // @ts-ignore
        const res = await prisma[model].findMany({
            where,
            ...options
        })

        return res;

}