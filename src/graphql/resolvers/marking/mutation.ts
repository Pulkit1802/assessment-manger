import { prisma } from "../../../config";
import xlsx from "xlsx";
import ApiError from "../../../utils/apiError";
import path from "path";

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

    uploadMarking: async (_: any, args: any) => {

        const {data} = args || {};
        const {sectionId, testId, fileUrl} = data;

        const testDetails = await prisma.test.findUnique({
            where: {
                id: testId,
            },
            select: {
                parts: {
                    select: {
                        id: true,
                        // requiredQuestions: true,
                        questions: true,
                    }
                }
            }
        });

        if (!testDetails)
            throw new ApiError(404, "Test not found");

        const sectionStudents = await prisma.section.findUnique({
            where: {
                id: sectionId,
            },
            select: {
                students: true,
            }
        });

        if (!sectionStudents)
            throw new ApiError(404, "Section not found");

        console.log()

        const workbook = xlsx.readFile(path.join(__dirname + './../../../../uploads/'+fileUrl));
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const studentMarking = xlsx.utils.sheet_to_json(sheet);

        const {parts} = testDetails;
        const {students} = sectionStudents;

        // console.log(students)
    
        studentMarking.forEach(async (studentMark: any) => {

            const student = students.find((student: any) => student.regNo == studentMark.regNo);
            if (!student)
                throw new ApiError(404, "Student not found");

            const studentQuestionWiseMarks: any[] = [];
            let totalMarksObtained = 0;
            parts.forEach((part: any) => {

                const {id, questions} = part;

                questions.forEach((question: any) => {

                    studentQuestionWiseMarks.push({
                        partId: id,
                        questionId: question.id,
                        marksObtained: studentMark[question.name],
                    });

                    totalMarksObtained += studentMark[question.name];

                });

            })

            await prisma.marking.create({
                data: {
                    studentId: student.id,
                    testId,
                    totalMarksObtained,
                    sectionId,
                    questionWiseMarksObtained: {
                        createMany: {
                            data: studentQuestionWiseMarks,
                        },
                    },
                },
            });

        })

        return await prisma.marking.findMany({
            where: {
                testId: testId,
                sectionId: sectionId,
            }
        });

    },

    deleteMarking: async (_: any, args: any) => {
        const {where} = args;
        await prisma.questionMarking.deleteMany({
            where: {
                markingId: where.id,
            }
        })
        return await prisma.marking.delete({
            where
        });

    }
};