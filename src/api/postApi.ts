import { ListResponse, Post } from '../models';
import axiosClient from './axiosClient';

export const postApi = {
    getAll(): Promise<ListResponse<Post>> {
        const url = 'api/posts';
        return axiosClient.get(url);
    },
};
