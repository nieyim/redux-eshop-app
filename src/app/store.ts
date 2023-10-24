import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import dashboardSlice from '../features/dashboard/dashboardSlice';
import productSlice from '../features/product/productSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        product: productSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
