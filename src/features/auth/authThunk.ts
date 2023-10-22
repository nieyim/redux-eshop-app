import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api';
import { LoginPayload } from '../../models';

// Create an async thunk for user login
export const authThunk = createAsyncThunk('auth/login', async (loginPayload: LoginPayload, { rejectWithValue }) => {
    try {
        // Make the API request to authenticate the user
        const response = await userApi.getLoginCredentials(loginPayload);
        const data = response.data;

        // Store the user's token in local storage
        localStorage.setItem('token', data.token);

        // Return the data, which will be the action.payload in the success case
        return data;
    } catch (error: any) {
        // Return a custom error message from the API if available
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
