import configs from "../config/config";
import { PrismaClient } from "@prisma/client";
import { buildOptions } from "./prisma.utils";

const { prisma } = configs;

export const prismaCreate = async (
    model: keyof PrismaClient, 
    data: any,
    options: any
    ) => {

        options = buildOptions(options);
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

        options = buildOptions(options);
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
        
        options = buildOptions(options);
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

        options = buildOptions(options);
        // @ts-ignore
        const res = await prisma[model].findMany({
            where,
            ...options
        })

        return res;

}

export const prismaUpdate = async (
    model: keyof PrismaClient,
    where: any,
    data: any,
    options: any
    ) => {

        options = buildOptions(options);
        // @ts-ignore
        const res = await prisma[model].update({
            where,
            data,
            ...options
        })

        return res;

}

export const prismaUpdateMany = async (
    model: keyof PrismaClient,
    where: any,
    data: any,
    options: any
    ) => {

        options = buildOptions(options);
        // @ts-ignore
        const res = await prisma[model].updateMany({
            where,
            data,
            ...options
        })

        return res;

}

export const prismaDelete = async (
    model: keyof PrismaClient,
    where: any,
    options: any
    ) => {

        options = buildOptions(options);
        // @ts-ignore
        await prisma[model].delete({
            where,
            ...options
        })

        return {
            status: "deleted",
        };

}

export const prismaDeleteMany = async (
    model: keyof PrismaClient,
    where: any,
    options: any
    ) => {

        options = buildOptions(options);
        // @ts-ignore
        await prisma[model].deleteMany({
            where,
            ...options
        })

        return {
            status: "deleted",
        };

}