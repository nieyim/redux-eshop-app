import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../../api';

export const productThunk = createAsyncThunk('product/fetchData', async () => {
    try {
        const productResponse = await productsApi.getAllProducts();
        const productData = productResponse.data;

        const categoryResponse = await productsApi.getAllCategory();
        const categoryData = categoryResponse.data;

        return {
            productList: productData,
            categoryList: categoryData,
        };
    } catch (error: any) {
        return error.message;
    }
});
