import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const mutations = {
    createTest:async (_: any, args: any) => {
        const {data} = args;
        const {parts} = data;

        console.log(data);

        if (parts.length != data.totalParts)
            throw new ApiError(400, "Parts count mismatch");

        // @ts-ignore
        delete data.parts;
        delete data.markUploadDeadLine,
        data.markUploadDeadline = new Date().toISOString();

        const courseCode = data.courseCode;
        delete data.courseCode;

        const test = await prisma.test.create({
            data:{
                ...data,
                course: {
                    connect: {
                        code: courseCode,
                    }
                },
            },
        });

        parts.forEach(async (part: any) => {
            const {questions} = part;
            if (questions.length != part.maxQuestions)
                throw new ApiError(400, "Questions count mismatch");

            // @ts-ignore
            delete part.questions;
            part.testId = test.id;
            
            await prisma.part.create({
                data:{
                    ...part,
                    questions: {
                        createMany: {
                            data: questions,
                        }
                    }
                },
            });

            // questions.forEach(async (question: any) => {
            //     question.partId = testPart.id;
            //     await prisma.question.create({
            //         data:{
            //             ...question,
            //         },
            //     });
            // });

        });

        const res = await prisma.test.findUnique({
            where: {
                id: test.id,
            },
            include: {
                parts: {
                    include: {
                        questions: true,
                    },
                },
            },
        });

        return res;
    },

    deleteTest: async (_: any, args: any) => {
        const {where} = args;

        return await prisma.test.delete({
            where
        });

    },
}