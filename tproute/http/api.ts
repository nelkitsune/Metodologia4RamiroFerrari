import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export async function getData<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(endpoint, config);
    return response.data;
}