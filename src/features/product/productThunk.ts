import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../../api';

export const productThunk = createAsyncThunk('product/fetchData', async () => {
    try {
        const response = await productsApi.getAllProducts();
        const data = response.data;

        return {
            productList: data,
        };
    } catch (error: any) {
        return error.message;
    }
});
