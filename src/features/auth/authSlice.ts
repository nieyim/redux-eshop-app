import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../models';
import { authThunk } from './authThunk';
import { getJwtTokenFromSessionStorage } from '../../utils/jwt';

interface AuthState {
    loading: boolean;
    userInfo: User | null;
    userToken: string | null;
    error: string;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    userInfo: getJwtTokenFromSessionStorage() || null,
    userToken: null,
    error: '',
    success: false,
};

// Create an auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = '';
            state.success = false;
            sessionStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(authThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userInfo = action.payload;
                state.userToken = action.payload.token;
            })
            .addCase(authThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

// export const { loginPending, loginFailed, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.success;
export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
