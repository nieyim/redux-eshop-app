import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserState } from './models/userModel';
import { userThunk } from './userThunk';

const initialState: UserState = {
    loading: false,
    error: '',
    userList: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userThunk.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(userThunk.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.userList = action.payload.userList;
            })
            .addCase(userThunk.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

export default userSlice.reducer;
export const selectIsLoading = (state: RootState) => state.user.loading;
export const selectUserList = (state: RootState) => state.user.userList;
