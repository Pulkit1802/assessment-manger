import { prisma } from "../../../config";
import xlsx, { writeFileAsync } from "xlsx";
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

            } else if (partQuestionMarks.length > part.requiredQuestions) {
                while (partQuestionMarks.length > part.requiredQuestions) {
                    let leastMarkQuestionIndex = 0;
                    for (let i=1; i<partQuestionMarks.length; i++) {
                        if (partQuestionMarks[i].marksObtained < partQuestionMarks[leastMarkQuestionIndex].marksObtained)
                            leastMarkQuestionIndex = i;
                    }
                    delete partQuestionMarks[leastMarkQuestionIndex];
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
        console.log(data)
        const testDetails = await prisma.test.findUnique({
            where: {
                id: testId,
            },
            select: {
                parts: {
                    select: {
                        id: true,
                        requiredQuestions: true,
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

                const thisPartMarks: any = []

                const unmarkedQuestion: any = []

                questions.forEach((question: any) => {

                    if (studentMark[question.name]) {
                        thisPartMarks.push({
                            partId: id,
                            questionId: question.id,
                            marksObtained: (+studentMark[question.name]),
                        });
                        totalMarksObtained += (+studentMark[question.name]);
                    } else {
                        unmarkedQuestion.push(question);
                    }
                });

                if (thisPartMarks.length < part.requiredQuestions) {
                    const diff = part.requiredQuestions - thisPartMarks.length;
                    for(let i=0; i < diff; i++) {
                        thisPartMarks.push({
                            partId: id,
                            questionId: unmarkedQuestion[i].id,
                            marksObtained: 0,
                        });
                    }
                } else if (thisPartMarks.length > part.requiredQuestions) {
                    while (thisPartMarks.length > part.requiredQuestions) {
                        let leastMarkQuestionIndex = 0;
                        for (let i=1; i<thisPartMarks.length; i++) {
                            if (thisPartMarks[i].marksObtained < thisPartMarks[leastMarkQuestionIndex].marksObtained)
                                leastMarkQuestionIndex = i;
                        }
                        delete thisPartMarks[leastMarkQuestionIndex];
                    }
                }

                studentQuestionWiseMarks.push(...thisPartMarks);

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

            console.log(studentQuestionWiseMarks);

        })

        return await prisma.marking.findMany({
            where: {
                testId: testId,
                sectionId: sectionId,
            }
        });

    },

    downloadMarking: async (_: any, args: any) => {
        const {sectionId, testId} = args

        const testDetails = await prisma.test.findUnique({
            where: {
                id: testId
            },
            select: {
                parts: {
                    select: {
                        questions: true
                    }
                }
            }
        })

        if (!testDetails)
            throw new ApiError(404, 'Test Not Found');

        const sectionDetails = await prisma.section.findUnique({
            where: {
                id: sectionId,
            }, select: {
                students: {
                    select: {
                        regNo: true,
                        name: true
                    }
                }
            }
        })

        if (!sectionDetails)
            throw new ApiError(404, 'Section Not Found');

        const {parts} = testDetails;
        
        const convertedQuestionToKeys: any = {}
        
        parts.forEach((part: any) => {
            const {questions} = part;

            questions.forEach((question: any) => {
                convertedQuestionToKeys[question.name] = ''
            })

        })

        const {students} = sectionDetails;
        const excelJsonData: any = []

        students.forEach((student: any) => {
            excelJsonData.push({
                ...student,
                ...convertedQuestionToKeys
            })
        })

        console.log(excelJsonData)

        const markingExcel = xlsx.utils.book_new()
        const sheet = xlsx.utils.json_to_sheet(excelJsonData);

        xlsx.utils.book_append_sheet(markingExcel, sheet);
        const fileName = `${sectionId}_${testId}_marking.xlsx`
        // console.log(sheet)
        xlsx.writeFile(markingExcel, 'uploads/'+fileName)

        return fileName;

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