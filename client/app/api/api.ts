import axios from 'axios';

const graphqlApi = axios.create({
    baseURL: process.env.NEXT_APP_GRAPHQL_API_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
});

const graphqlApiWithAuth = axios.create({
    baseURL: process.env.NEXT_APP_GRAPHQL_API_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

    return await graphqlApi.post('', { query });
}