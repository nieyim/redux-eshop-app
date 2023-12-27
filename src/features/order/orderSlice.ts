import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { OrderState } from './models/orderModel';
import { orderThunk } from './orderThunk';

const initialState: OrderState = {
    loading: false,
    error: '',
    orderList: [],
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(orderThunk.pending, (state: OrderState) => {
                state.loading = true;
            })
            .addCase(orderThunk.fulfilled, (state: OrderState, action) => {
                state.loading = false;
                state.orderList = action.payload.orderList;
            })
            .addCase(orderThunk.rejected, (state: OrderState, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

export default orderSlice.reducer;
export const selectIsLoading = (state: RootState) => state.order.loading;
export const selectOrderList = (state: RootState) => state.order.orderList;
