import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createReport: async (_:any, args: any) => {
        const {data} = args

        // TODO: Get The Test Details
            // ?? Get All the Question Ids

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
        const questionDetails: any = {};

        const requiredPercentageForTheTest = testDetails.requiredPercentage;

        parts.forEach((part: any) => {
            const {questions} = part;
            questions.forEach((question: any) => {

                const objective = question.objective;

                // ?? Check If Objective Is A Key In questionDetails, not create new one else push on key

                if (!questionDetails[objective])
                    questionDetails[objective] = {
                        [question.id]: {
                            maxMarks: question.maxMarks,
                            studentsAttempted: 0,
                            sumOfMarks: 0,
                            studentsAboveRequiredPercentage: 0
                        }
                    };
                else
                    questionDetails[objective][question.id] = {
                        maxMarks: question.maxMarks,
                        studentsAttempted: 0,
                        sumOfMarks: 0,
                        studentsAboveRequiredPercentage: 0
                    };
            });

        });

        // console.log(questionDetails);

        // TODO: Get The Respective Marking Details
            // ?? Get Total Number of Students
            // ?? Marking Details Change As Per Report Type (Section Wise, Program Wise, Course Wise)

        // let markingDetails: any = [];

        // if (data.type === "section") {

        //     markingDetails = await prisma.marking.findMany({
        //         where: {
        //             testId: data.testId,
        //             // sectionId: data.sectionId,
        //         },
        //         include: {
        //             questionWiseMarksObtained: true,
        //         }
        //     });

        
        // } else if (data.type === 'program') {
            
        //     // TODO: Get Reports For All The Sections In The Program
        //         // ?? Merge All the Reports To Get Program Wise Report

        // } else {

        //     // TODO: Get Reports For All The Programs In The Course
        //         // ?? Merge All the Reports To Get Course Wise Report

        // }

        

        // TODO: From marking details find stats question wise
            // ?? Get Number Of students Who Attempted
            // ?? Get Average Students Marks
            // ?? From Required Percentage Of Test, Find Number above that percentage
        
        // for (const [key, values] of Object.entries(questionDetails)) {
            // console.log(key, values);
            // const markingDetails = await prisma.marking.findMany({
            //     where: {
            //         testId: data.testId,
            //         // sectionId: data.sectionId,
            //     },
            //     select: {
            //         questionWiseMarksObtained: {
            //             where: {
            //                 id: {
            //                     // @ts-ignore
            //                     in: values.map((value: any) => value.id),
            //                 }
            //             },
            //         }
            //     }
            // });

            // const questionWiseReportDetails: any = {};
            // @ts-ignore

            // console.log(key, values);

        // }

        // const questionWiseMarkingDetails = await prisma.questionMarking.findMany({
        //     where: {
        //         id: {
        //             in: questionIds,
        //         }
        //     }
        // });

        const totalStudents = await prisma.student.count({
            where: {
                sections: {
                    some: {
                        id: data.sectionId,
                    }
                },
            }
        })

        for (const [key, value] of Object.entries(questionDetails)) {
            // @ts-ignore
            const questionIds = Object.keys(value);

            const questionMarkingForTheObjective = await prisma.questionMarking.findMany({
                where: {
                    questionId: {
                        in: questionIds,
                    }
                }
            });

            const questionWiseReportData: any = [];

            questionMarkingForTheObjective.forEach((markDetail) => {
                questionDetails[key][markDetail.questionId]['studentsAttempted'] += 1;
                questionDetails[key][markDetail.questionId]['sumOfMarks'] += markDetail.marksObtained;
                // @ts-ignore
                if (markDetail.marksObtained >= (value[markDetail.questionId].maxMarks * requiredPercentageForTheTest / 100))
                    questionDetails[key][markDetail.questionId]['studentsAboveRequiredPercentage'] += 1;
            });

            let aboveReqPercentage = 0
            let reportTotalAvgMarks = 0;

            for (const [questionId, questionCalcDetail] of Object.entries(questionDetails[key])) {
                // @ts-ignore
                const avgMarks = questionCalcDetail.sumOfMarks / questionCalcDetail.studentsAttempted;
                // @ts-ignore
                aboveReqPercentage += questionCalcDetail.studentsAboveRequiredPercentage;
                reportTotalAvgMarks += avgMarks;
                questionWiseReportData.push({
                    questionId,
                    avgMarks,
                // @ts-ignore
                    studentsAttempted: questionCalcDetail.studentsAttempted,
                // @ts-ignore
                    studentsAboveRequiredPercentage: questionCalcDetail.studentsAboveRequiredPercentage,
                })
            }

            console.log(questionWiseReportData);
            break;
            // await prisma.report.create({
            //     data: {
            //         testId: `${data.testId}`,
            //         objective: +key,
            //         name: `${data.name}`,
            //         type: `${data.type}`,
            //         totalStudents: +totalStudents,
            //         avgMarks: Number(reportTotalAvgMarks / questionIds.length),
            //         studentsPassed: aboveReqPercentage,
            //         studentsFailed: totalStudents - aboveReqPercentage,
            //         studentsAboveRequiredPercentage: aboveReqPercentage,
            //         // coAttainmentLevel: 0
            //         questionsReport: {
            //             createMany: questionWiseReportData,
            //         }
            //     }
            // })

        }

    }
}