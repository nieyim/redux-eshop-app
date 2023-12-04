import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { productThunk } from './productThunk';
import { ProductState } from './models/productModels';

const initialState: ProductState = {
    loading: false,
    error: '',
    productList: [],
    addNewProduct: {
        id: 0,
        title: '',
        summary: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
        description: [],
    },
    categoryList: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productThunk.pending, (state: ProductState) => {
                state.loading = true;
            })
            .addCase(productThunk.fulfilled, (state: ProductState, action) => {
                state.loading = false;
                state.productList = action.payload.productList;
                state.categoryList = action.payload.categoryList;
            })
            .addCase(productThunk.rejected, (state: ProductState, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

export default productSlice.reducer;
export const selectIsLoading = (state: RootState) => state.product.loading;
export const selectProductList = (state: RootState) => state.product.productList;
export const selectCategoryList = (state: RootState) => state.product.categoryList;
