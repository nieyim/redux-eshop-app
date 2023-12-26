import { ListResponse, LoginPayload, ObjectResponse, User } from '../models';
import axiosClient from './axiosClient';
import axiosLoginClient from './axiosLoginClient';

export const userApi = {
    getLoginCredentials(data: LoginPayload) {
        const url = 'auth/login';
        return axiosLoginClient.post(url, data);
    },
    getAll(): Promise<ListResponse<User>> {
        const url = 'api/users';
        return axiosClient.get(url);
    },
    getUserById(id: string | number): Promise<ObjectResponse<User>> {
        const url = `api/users/${id}`;
        return axiosClient.get(url);
    },
    deleteUser(id: any) {
        const url = `api/users/${id}`;
        return axiosClient.delete(url);
    },
};
