import axios from "axios";

const graphqlApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export const register = async (data: any) => {

    const query = `
        mutation {
            register(data: {name: "${data.name}", email: "${data.email}", password: "${data.password}", role: "${data.role}", deptId: "${data.deptId}", phoneNumber: "${data.phoneNumber}"}) {
                name
            }
        }
    `;

    return await graphqlApi.post('/', { query });
}

export const approveUser = async (id: string) => {
    const query = `
        mutation {
            approveUser(id: "${id}")
        }
    `;

    return await graphqlApi.post('/', { query });
}

export const newUser = async (data: any) => {
    const query = `
        mutation {
            createUser(data: {name: "${data.name}", email: "${data.email}", password: "${data.password}", role: "${data.role}", deptId: "${data.deptId}", phoneNumber: "${data.phoneNumber}"}) {
                name
            }
        }
    `;

    return await graphqlApi.post('/', { query });
}

export const createDept = async (data: any) => {
    const query = `
        mutation {
            createDept(data: {name: "${data.name}"}) {
                name
            }
        }
    `;

    return await graphqlApi.post('/', { query });
}

export const createProgram = async (data: any) => {

    const query = `
        mutation CreateProgram($data: ProgramCreateInput!) {
            createProgram(data: $data) {
                name
            }
        }
    `;

    return await graphqlApi.post('/', { query, variables: { data } });

}

export const createCourse = async (name: string, code: string, cordinatorEmail: string) => {

    const query = `
        mutation CreateCourse($data: CourseCreateInput!) {
            createCourse(data: $data) {
                name
                code
            }
        }
    `;

    const data = { name, code, cordinatorEmail };

    return await graphqlApi.post('/', { query, variables: { data } });

}

export const createSection = async (data: any) => {
    
    data.semester = parseInt(data.semester);

    const query = `
        mutation CreateSection($data: SectionCreateInput!) {
            createSection(data: $data) {
                roomNo
            }
        }
    `;

    return await graphqlApi.post('/', { query, variables: { data } });
}

export const generateReport = async (data: any) => {
    console.log(data);
    const query = `
        mutation UploadMarking($uploadMarkingData2: MarkingUploadInput) {
            uploadMarking(data: $uploadMarkingData2) {
                id
            }
        }
    `;

    return await graphqlApi.post('/', { query, variables: { uploadMarkingData2: data } });

}

export const createTest = async (data: any) => {
    
        console.log(data)

        const query = `
            mutation CreateTest($data: TestCreateInput) {
                createTest(data: $data) {
                    id
                }
            }
        `

        /* 
            Variable "$data" got invalid value "60" at "data.requiredPercentage"; Float cannot represent non numeric value: "60"
            Variable "$data" got invalid value "1" at "data.maxMarks"; Int cannot represent non-integer value: "1"
            Variable "$data" got invalid value "1" at "data.totalParts"; Int cannot represent non-integer value: "1"
            Variable "$data" got invalid value "1" at "data.parts[0].maxQuestions"; Int cannot represent non-integer value: "1"
            Variable "$data" got invalid value "1" at "data.parts[0].requiredQuestions"; Int cannot represent non-integer value: "1"
            Variable "$data" got invalid value "1" at "data.parts[0].maxMarks"; Int cannot represent non-integer value: "1"
        */

        data.requiredPercentage = parseFloat(data.requiredPercentage);
        data.maxMarks = parseInt(data.maxMarks);
        data.totalParts = parseInt(data.totalParts);
        data.parts.forEach((part: any) => {
            part.maxQuestions = parseInt(part.maxQuestions);
            part.requiredQuestions = parseInt(part.requiredQuestions);
            part.maxMarks = parseInt(part.maxMarks);

            part.questions.forEach((question: any) => {
                question.maxMarks = parseInt(question.maxMarks);
                question.objective = parseInt(question.objective);
            })

        });

        
        return await graphqlApi.post('/', { query, variables: { data } });
    
    
}


export const createReport = async (data: any) => {

    console.log(data)

    const query = `
        mutation CreateReport($data: ReportCreateInput) {
            createReport(data: $data) {
                id
                name
                studentsAboveRequiredPercentage
                totalStudents
                avgMarks
                type
                questionsReport {
                    id
                    avgMarks
                    studentsAboveRequiredPercentage
                    studentsAttempted
                }
            }
        }
    `
    return await graphqlApi.post('/', { query, variables: { data } });

}

export const getSectionTestMarking = async (data: any) => {

    const query = `
        query Markings($where: MarkingWhereInput) {
            markings(where: $where) {
                id
                questionWiseMarksObtained {
                    marksObtained
                    question {
                        maxMarks
                        name
                        objective
                        part {
                            name
                        }
                    }
                }
                student {
                    regNo
                }
            }
        }
    `;

    const variables = { where: {...data} }; // Assign the 'where' argument to the variables object

    return await graphqlApi.post('/', { query, variables });

}