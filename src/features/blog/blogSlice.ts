import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BlogState } from './models/blogModel';
import { blogThunk } from './blogThunk';

const initialState: BlogState = {
    loading: false,
    error: '',
    postList: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(blogThunk.pending, (state: BlogState) => {
                state.loading = true;
            })
            .addCase(blogThunk.fulfilled, (state: BlogState, action) => {
                state.loading = false;
                state.postList = action.payload.blogList;
            })
            .addCase(blogThunk.rejected, (state: BlogState, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

export default productSlice.reducer;
export const selectIsLoading = (state: RootState) => state.blog.loading;
export const selectBlogList = (state: RootState) => state.blog.postList;
