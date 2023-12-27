import { ListResponse, ObjectResponse, Post } from '../models';
import axiosClient from './axiosClient';

export const postApi = {
    getAll(): Promise<ListResponse<Post>> {
        const url = 'api/posts';
        return axiosClient.get(url);
    },
    getPostByID(id: string): Promise<ObjectResponse<Post>> {
        const url = `api/posts/${id}`;
        return axiosClient.get(url);
    },
    deletePost(id: any) {
        const url = `api/posts/${id}`;
        return axiosClient.delete(url);
    },
};
