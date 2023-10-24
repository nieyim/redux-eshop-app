import { ListResponse } from '../models';
import { Cart } from '../models/Cart';
import axiosClient from './axiosClient';

export const cartApi = {
    getAll(): Promise<ListResponse<Cart>> {
        const url = 'api/carts';
        return axiosClient.get(url);
    },
};
