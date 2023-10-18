import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const mutations = {
    createTest:async (_: any, args: any) => {
        const {data} = args;
        const {parts} = data;

        if (parts.length != data.totalParts)
            throw new ApiError(400, "Parts count mismatch");

        // TODO: Make changes to creation in single query
        // @ts-ignore
        delete data.parts;

        const test = await prisma.test.create({
            data:{
                ...data,
                parts:{
                    create: parts.map((part: any) => {
                        const { questions } = part;
                        // @ts-ignore
                        delete part.questions;
                        return {
                            ...part,
                            questions:{
                                create: questions
                            }
                        }
                    })
                }
            },
            include:{
                parts:{
                    include:{
                        questions:true
                    }
                }
            }
        });

        return test;
    }
}