import { apiUrl } from './env';
import axios from 'axios';

const axios_instance = axios.create({
    baseURL: apiUrl,
    timeout: 7000,
});


const GET = (url: string, params?: any) => {
    return axios_instance.get(url, { params });
}


const POST = (url: string, data?: any) => {
    return axios_instance.post(url, data);
}


const PUT = (url: string, data?: any) => {
    return axios_instance.put(url, data);
}


const PATCH = (url: string, data?: any) => {
    return axios_instance.patch(url, data);
}

const ApiCall = {
    GET,
    POST,
    PATCH,
    PUT,
}

export default ApiCall;