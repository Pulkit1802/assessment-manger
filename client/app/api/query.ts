"use client"

import axios from 'axios';

const graphqlApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const graphqlApiWithAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDepts = async () => {
    const query = `
        query {
            depts {
                id
                name
            }
        }
    `;

    return await graphqlApi.post('/', { query });
}

export const login = async (email: string, password: string) => {
    const query = `
        query {
            login(email: "${email}", password: "${password}") {
                token
                user {
                    id
                    name
                    email
                    role
                }
            }
        }
    `;

    return await graphqlApi.post('/', { query });
};

export const getSerctions = async () => {

    const query = `
        query {
            sections {
                id
                batch
                roomNo
                semester
            }
        }
    `;
    
    graphqlApiWithAuth.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    return await graphqlApiWithAuth.post('/', { query });

}

export const getSection = async (id: string) => {

    const query = `
        query {
            section(where: {id: "${id}"}) {
                id
                batch
                roomNo
                semester
                course {
                    name
                    tests {
                        id
                        name
                        markUploadDeadLine
                    }
                }
            }
        }
    `;

    graphqlApiWithAuth.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return await graphqlApiWithAuth.post('/', { query });

}

export const getSectionReports = async (sectionId: string) => {
    const query = `
        query Reports($where: ReportWhereInput) {
            reports(where: $where)  {
                name
                id
                objective
                avgMarks
                coAttainmentLevel
                studentsAboveRequiredPercentage
            }
        }
    `;

    return await graphqlApiWithAuth.post('/', { query, variables: { where: { sectionId } } });
} 

export const waitlist = async () => {

    const query = `
        query {
            userWatingForApproval {
                id
                name
                email
                role
                dept {
                  name
                }
              }
        }
    `;

    return await graphqlApi.post('/', { query });

}


export const getPrograms = async (deptId: string) => {

    const query = `
        query {
            programs(where: {deptId: "${deptId}"}) {
                id
                name
            }
        }
    `;

    return await graphqlApi.post('/', { query }); 

}

export const generateMarksheet = async (testId: string, sectionId: string) => {

    console.log(testId, sectionId);
    
    const query = `
        mutation DownloadMarking($sectionId: ID!, $testId: ID!) {
            downloadMarking(sectionId: $sectionId, testId: $testId)
        }
    `;

    return await graphqlApi.post('/', { query, variables: { sectionId, testId } }); 
    
}

export const getSectionTestMarking = async (markingsWhere2: any) => {

    const query = `
        query Marking($markingsWhere2: MarkingWhereInput) {
            markings(where: $markingsWhere2) {
                id
                student {
                    name
                }
            }
        }
    `

    return await graphqlApi.post('/', { query, variables: { markingsWhere2 } }); 

}