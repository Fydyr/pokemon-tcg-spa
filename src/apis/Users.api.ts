import axios from 'axios';
import type { IUserPayload } from '../types/Users.type';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const PostUser = async (userPayload: IUserPayload) => {
    const response: any = await api.post('/users', userPayload);
    console.log(response.data);
    return response.data;
}

export const PostUserLogin = async (userPayLoad: IUserPayload) => {
    const response : any = await api.post('/users/login', userPayLoad);
    console.log(response.data);
    return response.data;
}

