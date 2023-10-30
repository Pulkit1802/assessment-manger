"use client"

import axios from 'axios';

const graphqlApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// const graphqlApiWithAuth = axios.create({
//     baseURL: process.env.NEXT_APP_GRAPHQL_API_URL,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     },
// });

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