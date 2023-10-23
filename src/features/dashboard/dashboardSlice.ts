import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { dashboardThunk } from './dashboardThunk';
import { DashboardState } from './models/dashboardModel';

const initialState: DashboardState = {
    loading: false,
    statistics: {
        userCount: 0,
        productCount: 0,
        productCategoryCount: 0,
        postCount: 0,
    },
    error: '',
    barchart: [],
    piechart: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dashboardThunk.pending, (state: DashboardState) => {
                state.loading = true;
            })
            .addCase(dashboardThunk.fulfilled, (state: DashboardState, action) => {
                state.loading = false;
                state.statistics.userCount = action.payload.userCount;
                state.statistics.productCount = action.payload.productCount;
                state.statistics.productCategoryCount = action.payload.categoryCount;
                state.statistics.postCount = action.payload.postCount;
                state.barchart = action.payload.cartList;
                state.piechart = action.payload.productEachCategory;
            })
            .addCase(dashboardThunk.rejected, (state: DashboardState, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'An error occurred';
            });
    },
});

export default dashboardSlice.reducer;
export const selectUserCount = (state: RootState) => state.dashboard.statistics.userCount;
export const selectProductCount = (state: RootState) => state.dashboard.statistics.productCount;
export const selectCategoryCount = (state: RootState) => state.dashboard.statistics.productCategoryCount;
export const selectPostCount = (state: RootState) => state.dashboard.statistics.postCount;
export const selectIsLoading = (state: RootState) => state.dashboard.loading;
export const selectBarChart = (state: RootState) => state.dashboard.barchart;
export const selectPieChart = (state: RootState) => state.dashboard.piechart;
