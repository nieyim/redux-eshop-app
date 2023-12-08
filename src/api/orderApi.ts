import { ListResponse } from '../models';
import { Order } from '../models/Order';
import axiosClient from './axiosClient';

export const orderApi = {
    getAll(): Promise<ListResponse<Order>> {
        const url = 'api/orders';
        return axiosClient.get(url);
    },
    addCart(data: Order) {
        const url = 'api/orders';
        return axiosClient.post(url, data);
    },
};
