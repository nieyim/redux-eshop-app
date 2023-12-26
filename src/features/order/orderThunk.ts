import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi } from '../../api';

export const orderThunk = createAsyncThunk('order/fetchData', async () => {
    try {
        const orderResponse = await orderApi.getAll();
        const orderData = orderResponse.data;

        return {
            orderList: orderData,
        };
    } catch (error: any) {
        return error.message;
    }
});
