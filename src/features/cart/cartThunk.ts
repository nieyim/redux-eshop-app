import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../../api';

export const cartThunk = createAsyncThunk('cart/fetchData', async () => {
    try {
        const cartResponse = await cartApi.getAll();
        const cartData = cartResponse.data;

        return {
            cartList: cartData,
        };
    } catch (error: any) {
        return error.message;
    }
});
