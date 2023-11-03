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
            approveUser(id: "${id}") {
                
            }
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
