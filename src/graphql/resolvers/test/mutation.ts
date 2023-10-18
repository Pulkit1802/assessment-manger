import ApiError from "../../../utils/apiError";
import { prisma } from "../../../config";

export const mutations = {
    createTest:async (_: any, args: any) => {
        const {data} = args;
        const {parts} = data;
        if (parts.length != data.totalParts)
            throw new ApiError(400, "Invalid total part");

        // TODO: Make changes to creation in single query

        const testData = data;
        delete testData.parts;
        delete testData.totalParts;

        const date = new Date();

        const test = await prisma.test.create({
            data: {
                ...testData,
                markUploadDeadline: date.toISOString(),
            }
        });
        
        parts.forEach(async (partData: any) => {
            const {questions} = partData;

            if (questions.length != partData.maxQuestions)
                throw new ApiError(400, "Invalid total question");

            delete partData.questions;
            const part = await prisma.part.create({
                data: {
                    testId: test.id,
                    ...partData,
                }
            });

            const questionData = questions.map((question: any) => {
                return {
                    ...question,
                    partId: part.id,
                }
            });

            await prisma.question.createMany({
                data: questionData,
            });

        });

        return await prisma.test.findFirst({
            where: {
                id: test.id
            },
            include: {
                course: true,
                parts: {
                    include: {
                        questions: true,
                    }
                },
                reports: true,
                testMarkings: true,
            }
        });

    }
}