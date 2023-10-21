import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createMarking: async (_: any, args: any) => {
        const {data} = args || {};
        const {questionMarks} = data;

        const testDetails = await prisma.test.findUnique({
            where: {
                id: data.testId,
            },
            include: {
                parts: {
                    include: {
                        questions: true,
                    }
                },
            },
        });

        if (!testDetails)
            throw new ApiError(404, "Test not found");

        const {parts} = testDetails;
        
        parts.forEach(async (part: any) => {
            const {questions} = part;
            const partQuestionMarks = questionMarks.filter((questionMark: any) => questionMark.partId == part.id);
            if (partQuestionMarks.length < part.requiredQuestions) {

                const diff = part.requiredQuestions - partQuestionMarks.length;
                const unmarkedQuestion = questions.filter((question: any) => {
                    const questionMark = partQuestionMarks.find((questionMark: any) => questionMark.questionId == question.id);
                    return !questionMark;
                });

                for(let i=0; i < diff; i++) {
                    questionMarks.push({
                        questionId: unmarkedQuestion[i].id,
                        partId: part.id,
                        marksObtained: 0,
                    });
                }

            }
        });

        // @ts-ignore
        delete data.questionMarks;

        const totalMarks = questionMarks.reduce((acc: any, questionMark: any) => acc + questionMark.marksObtained, 0);

        console.log(questionMarks);

        const marking = await prisma.marking.create({
            data:{
                ...data,
                totalMarksObtained: totalMarks,
                questionWiseMarksObtained: {
                    createMany: {
                        data: questionMarks,
                    },
                },
            },
        });

        return marking

    },

    deleteMarking: async (_: any, args: any) => {
        const {where} = args;

        return await prisma.marking.delete({
            where
        });

    }
};