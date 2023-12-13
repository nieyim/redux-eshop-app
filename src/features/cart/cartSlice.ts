import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { cartThunk } from './cartThunk';
import CartState from './models/cartModel';

const initialState: CartState = {
    loading: false,
    error: '',
    cartList: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // Add a reducer to handle adding a product to the cart
        addToCart: (state: CartState, action) => {
            const { products, quantity } = action.payload;
            console.log(products);
            const existingItem = state.cartList.find((item) => item.products.id === products.id);

            if (existingItem) {
                // If the item is already in the cart, update the quantity
                existingItem.quantity += quantity;
            } else {
                // If the item is not in the cart, add it
                state.cartList.push({
                    products: products,
                    quantity: quantity,
                });
            }
        },
        removeFromCart: (state: CartState, action) => {
            const id = action.payload;
            state.cartList = state.cartList.filter((item) => item.products.id !== id);
        },
        increaseQuantity: (state: CartState, action) => {
            const id = action.payload;
            const product = state.cartList.find((item) => item.products.id === id);
            if (product) {
                product.quantity++;
            }
        },
        decreaseQuantity: (state: CartState, action) => {
            const id = action.payload;
            const product = state.cartList.find((item) => item.products.id === id);
            if (product) {
                product.quantity--;
            }
            if (product?.quantity === 0) {
                state.cartList = state.cartList.filter((item) => item.products.id !== id);
            }
        },
    },
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
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const selectCartList = (state: RootState) => state.cart.cartList;
