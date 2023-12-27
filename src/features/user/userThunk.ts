import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api';

export const userThunk = createAsyncThunk('user/fetchData', async () => {
    try {
        const userResponse = await userApi.getAll();
        const userData = userResponse.data;

        return {
            userList: userData,
        };
    } catch (error: any) {
        return error.message;
    }
});
