import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createReport: async (_:any, args: any) => {
        const {data} = args

        const testDetails = await prisma.test.findUnique({
            where: {
                id: data.testId,
            },
            include: {
                parts: {
                    include: {
                        questions: true,
                    }
                }
            }
        });

        if(!testDetails)
            throw new ApiError(404, "Test not found");

        // TODO : Go through each question id
        // TODO : Create List of question report
        // TODO : Generate Report

        const {parts} = testDetails;
        let questionDetails: any = [];
        
        parts.forEach((part: any) => {
            questionDetails.push(...part.questions)
        });

        // find all the distinct objectives from questionDetails

        const questionWiseReportData: any = []

        const distinctObjectives = questionDetails.map((question: any) => question.objective).filter((value: any, index: any, self: any) => self.indexOf(value) === index);

        const allMarks = await prisma.marking.findMany({
            where: {
                testId: data.testId,
            }
        })

        const totalStudents = allMarks.length;

        for (const objective of distinctObjectives) {

            const ids = questionDetails.filter((question: any) => question.objective == objective).map((question: any) => question.id);

            const questionAnalytics = await prisma.questionMarking.groupBy({
                by: ["questionId"],
                where: {
                    questionId: {
                        in: ids,
                    },
                },
                _count: {
                    questionId: true,
                },
                _sum: {
                    marksObtained: true,
                },
                _avg: {
                    marksObtained: true,
                },
            });

            questionWiseReportData.push(...questionAnalytics.map((question: any) => {
                return {
                    questionId: question.questionId,
                    totalAttempts: question._count.questionId,
                    sumOfMarks: question._sum.marksObtained,
                    averageMarksObtained: question._avg.marksObtained,
                    studentAboveRequiredPercentage: 0,
                }
            }))

            const questionMarks = await prisma.questionMarking.findMany({
                where: {
                    questionId: {
                        in: ids,
                    },
                }
            });

            const reqPercentage = testDetails.requiredPercentage;
            questionMarks.forEach((questionMark: any) => {

                const question = questionDetails.find((question: any) => question.id == questionMark.questionId);
                // console.log(question)
                // @ts-ignore
                if (questionMark.marksObtained / question.maxMarks * 100 >= reqPercentage) { 
                    const questionInd = questionWiseReportData.findIndex((repQuestion: any) => repQuestion.questionId == question.id);
                    if (questionInd >= 0) {
                        questionWiseReportData[questionInd].studentAboveRequiredPercentage += 1;
                    }
                }
            })

        }

        console.log(questionWiseReportData);
        
    }
}