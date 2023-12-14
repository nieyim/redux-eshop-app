import { ListResponse } from '../models';
import { Cart } from '../models/Cart';
import axiosClient from './axiosClient';

export const cartApi = {
    getAll(): Promise<ListResponse<Cart>> {
        const url = 'api/carts';
        return axiosClient.get(url);
    },
    addCart(data: Cart) {
        const url = 'api/carts';
        return axiosClient.post(url, data);
    },
    checkCartItem(productId: number): Promise<Cart | null> {
        const url = 'api/carts';
        return axiosClient.get(url).then((response) => {
            const existingCartItem = response.data.find((item: Cart) => item.products.id === productId);
            return existingCartItem || null;
        });
    },
    updateCartItem(cartItem: Cart): Promise<void> {
        const url = `api/carts/${cartItem.id}`;
        return axiosClient.put(url, cartItem);
    },
    deleteCartItem(id: number) {
        const url = `api/carts/${id}`;
        return axiosClient.delete(url);
    },
};
