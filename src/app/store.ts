import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import dashboardSlice from '../features/dashboard/dashboardSlice';
import productSlice from '../features/product/productSlice';
import blogSlice from '../features/blog/blogSlice';
import cartSlice from '../features/cart/cartSlice';
import userSlice from '../features/user/userSlice';
import orderSlice from '../features/order/orderSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        product: productSlice,
        blog: blogSlice,
        cart: cartSlice,
        user: userSlice,
        order: orderSlice,
    },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
