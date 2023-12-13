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
        const url = 'api/carts'; // Assuming you retrieve the entire cart
        return axiosClient.get(url).then((response) => {
            const existingCartItem = response.data.find((item: Cart) => item.products.id === productId);
            return existingCartItem || null;
        });
    },
    updateCartItem(cartItem: Cart): Promise<void> {
        const url = `api/carts/${cartItem.id}`; // Change 'api/carts' to your actual endpoint
        return axiosClient.put(url, cartItem);
    },
};
