import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { cartThunk } from './cartThunk';
import CartState from './models/cartModel';

const initialState: CartState = {
    loading: false,
    error: '',
    cartList: {
        products: {
            id: 0,
            title: '',
            summary: '',
            price: 0,
            discountPercentage: 0,
            rating: 1,
            stock: 1,
            brand: '',
            category: '',
            thumbnail: '',
            images: [],
        },
        quantity: 0,
    },
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cartThunk.pending, (state: CartState) => {
                state.loading = true;
            })
            .addCase(cartThunk.fulfilled, (state: CartState, action) => {
                state.loading = false;
                state.cartList = action.payload.cartList;
            })
            .addCase(cartThunk.rejected, (state: CartState, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

export default cartSlice.reducer;
export const selectCartList = (state: RootState) => state.cart.cartList;
