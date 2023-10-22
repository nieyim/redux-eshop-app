import { LoginPayload } from '../models';
import axiosLoginClient from './axiosLoginClient';

export const userApi = {
    getLoginCredentials(data: LoginPayload) {
        const url = 'auth/login';
        return axiosLoginClient.post(url, data);
    },
};
