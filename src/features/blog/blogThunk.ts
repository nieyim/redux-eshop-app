import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../api';

export const blogThunk = createAsyncThunk('product/fetchData', async () => {
    try {
        const blogResponse = await postApi.getAll();
        const blogData = blogResponse.data;

        return {
            blogList: blogData,
        };
    } catch (error: any) {
        return error.message;
    }
});
