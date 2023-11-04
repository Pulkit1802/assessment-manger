import test from "node:test";
import { prisma } from "../../../config";
import ApiError from "../../../utils/apiError";

export const mutations = {
    createReport: async (_:any, args: any) => {
        const {data} = args

        let reports: any = [];

        if (data.type === "section") {
            reports = await genSectionReport(data);
        } else if (data.type === "program") {
            reports = await genProgramReport(data)
        }

        // console.log(reports); 

        return reports;

    },

    deleteReports: async (_: any, args: any) => {
        await prisma.questionReport.deleteMany();
        const rep = await prisma.report.deleteMany();
        console.log(rep);
        return true;
    }
}

const genSectionReport = async (data: any) => {
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

    const students = await prisma.student.findMany({
        where: {
            sections: {
                some: {
                    id: data.sectionId,
                }
            },
        }
    })

    const totalStudents = students.length;
    const studentIds = students.map((student) => student.id);
    const markingDetails = await prisma.marking.findMany({
        where: {
            studentId: {
                in: studentIds,
            }
        },
    });

    const markingIds = markingDetails.map((markingDetail) => markingDetail.id);
    // console.log(markingIds);

    for (const [key, value] of Object.entries(questionDetails)) {
        // @ts-ignore
        const questionIds = Object.keys(value);
        // console.log(questionIds)
        
        // const questionMarkingForTheObjective = markingDetails.map((markingDetail) => markingDetail.questionWiseMarksObtained);

        const questionMarkingForTheObjective = await prisma.questionMarking.findMany({
            where: {
                questionId: {
                    in: questionIds,
                },
                markingId: {
                    in: markingIds,
                }
            }
        });

        // console.log(questionMarkingForTheObjective);

        const questionWiseReportData: any = [];

        questionMarkingForTheObjective.forEach((markDetail) => {
            // console.log(questionDetails[key], markDetail.questionId)
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
        aboveReqPercentage /= questionWiseReportData.length;

        const section = await prisma.section.findUnique({
            where: {
                id: data.sectionId
            },
            select: {
                course: {
                    select: {
                        attainments: true
                    }
                },
            }
        })

        if (!section)
            console.log("hello")

        const course = section?.course;

        let attainmentLevel = 0

        if (course?.attainments.length) {
            for(const attainment of course.attainments) {
                if (attainment.reqPercentage < ((+aboveReqPercentage)/(+totalStudents)) && attainment.attainmentValue > attainmentLevel )
                    attainmentLevel = attainment.attainmentValue
            }
        }

        try {
            await prisma.report.create({
                data: {
                    testId: `${data.testId}`,
                    sectionId: `${data.sectionId}`,
                    objective: +key,
                    name: `${data.name}`,
                    type: `${data.type}`,
                    totalStudents: +totalStudents,
                    avgMarks: Number(reportTotalAvgMarks / questionIds.length),
                    studentsAboveRequiredPercentage: aboveReqPercentage,
                    coAttainmentLevel: attainmentLevel,
                    questionsReport: {
                        createMany: {
                            data: questionWiseReportData,
                        }
                    }
                }
            })
        } catch (e: any) {
            console.log("Error: \n", e.message, "\n", e.code, "\n", e.meta);
        }
        

    }

    return await prisma.report.findMany({
        where: {
            testId: data.testId,
            sectionId: data.sectionId,
        }
    });
}

const genProgramReport = async (data: any) => {
    const program = await prisma.program.findUnique({
        where: {
            id: data.programId,
        }
    });

    if (!program)
        throw new ApiError(404, "Program not found");

    const sections = await prisma.section.findMany({
        where: {
            programId: data.programId,
        },
        select: {
            id: true
        }
    });

    const studentsList:any = [];
    const sectionIds: any = [];

    sections.forEach((section) => {
        sectionIds.push(section.id);
    });

    // const testReportsForSectionsUnderProgram = await prisma.report.findMany({
    //     where: {
    //         testId: data.testId,
    //         sectionId: {
    //             in: sectionIds,
    //         }
    //     },
    //     include: {
    //         questionsReport: true,
    //     }
    // });

    // testReportsForSectionsUnderProgram.forEach((testReport) => {
    //     const { questionsReport } = testReport;
    // });
    
    const testReportsForSectionsUnderProgram = await prisma.report.findMany({
        where: {
            testId: data.testId,
            sectionId: {
                in: sectionIds,
            },
        },
        
    })

    const reportIdsObjectiveWise: any = {}

    testReportsForSectionsUnderProgram.forEach((testReport) => {

        if (!reportIdsObjectiveWise[testReport.objective])
            reportIdsObjectiveWise[testReport.objective] = [testReport.id];
        else
            reportIdsObjectiveWise[testReport.objective].push(testReport.id);

    });

    // const questionReportDetails = await prisma.questionReport.groupBy({
    //     by: ['questionId'],
    //     where: {
    //         reportId: {
    //             in: reportIds,
    //         }
    //     },
    //     _sum: {
    //         studentsAttempted: true,
    //         studentsAboveRequiredPercentage: true,
    //         avgMarks: true,
    //     },
    // });

    // const programReportData: any = {};

    // questionReportDetails.forEach((questionDetail) => {

    // })

    for (const [objective, reportIds] of Object.entries(reportIdsObjectiveWise)) {
        const questionReportDetails = await prisma.questionReport.groupBy({
            by: ['questionId'],
            where: {
                reportId: {
                    // @ts-ignore
                    in: reportIds,
                }
            },
            _sum: {
                studentsAttempted: true,
                studentsAboveRequiredPercentage: true,
                avgMarks: true,
            },
            _count: {
                questionId: true,
            }
        });

        const questionReportData: any = [];

        questionReportDetails.forEach((questionDetail) => {
            questionReportData.push({
                questionId: questionDetail.questionId,
                studentsAttempted: questionDetail._sum?.studentsAttempted,
                studentsAboveRequiredPercentage: questionDetail._sum?.studentsAboveRequiredPercentage,
                // @ts-ignore
                avgMarks: questionDetail._sum?.avgMarks / questionDetail._count?.questionId,
            })
        });

        const reportsForTheObjective = await prisma.report.findMany({
            where: {
                testId: data.testId,
                objective: +objective,
                type: 'section'
            }
        });

        let totalStudents = 0;
        let avgMarks = 0;
        let avgStudentAboveReqPercentage = 0;

        reportsForTheObjective.forEach((report) => {
            totalStudents += report.totalStudents;
            avgStudentAboveReqPercentage += report.studentsAboveRequiredPercentage;
            avgMarks += report.avgMarks;
        });

        avgMarks /= reportsForTheObjective.length;
        avgStudentAboveReqPercentage /= reportsForTheObjective.length;

        // get attainments for the test course wise

        const test = await prisma.test.findUnique({
            where: {
                id: data.id,
            },
            select: {
                course: {
                    select: {
                        attainments: true
                    }
                }
            }
        })

        try {
            await prisma.report.create({
                data: {
                    testId: `${data.testId}`,
                    programId: `${data.programId}`,
                    objective: +objective,
                    name: `${data.name}`,
                    type: `${data.type}`,
                    totalStudents: totalStudents,
                    avgMarks: avgMarks,
                    studentsAboveRequiredPercentage: avgStudentAboveReqPercentage,
                    coAttainmentLevel: 0,
                    questionsReport: {
                        createMany: {
                            data: questionReportData,
                        }
                    }
                }
            })
        } catch (e: any) {
            console.log("Error: \n", e.message, "\n", e.code, "\n", e.meta);
        }
    }

    console.log('hello');

    const reports = await prisma.report.findMany({
        where: {
            testId: data.testId,
            programId: data.programId,
            type: 'program'
        }
    });

    return reports;
}