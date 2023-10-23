import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi, userApi, postApi, cartApi } from '../../api';

export const dashboardThunk = createAsyncThunk('dashboard/fetchData', async () => {
    try {
        const productResponse = await productsApi.getAllProducts();
        const productData = productResponse.data;

        const userResponse = await userApi.getAll();
        const userData = await userResponse.data;

        const categoryResponse = await productsApi.getAllCategory();
        const categoryData = await categoryResponse.data;

        const postResponse = await postApi.getAll();
        const postData = await postResponse.data;

        const cartResponse = await cartApi.getAll();
        const cartData = await cartResponse.data;

        interface GroupedItem {
            category: string;
            value: number;
        }

        const productEachCategory: GroupedItem[] = productData.reduce((result: GroupedItem[], item: any) => {
            const existingGroup = result.find((group: GroupedItem) => group.category === item.category);
            if (existingGroup) {
                existingGroup.value++;
            } else {
                result.push({ category: item.category, value: 1 });
            }
            return result;
        }, []);

        return {
            cartList: cartData.sort((a: any, b: any) => b.id - a.id).slice(0, 10),
            productEachCategory: productEachCategory,
            topPriceProduct: productData.sort((a: any, b: any) => b.price - a.price),
            productCount: productData.length,
            userCount: userData.length,
            categoryCount: categoryData.length,
            postCount: postData.length,
        };
    } catch (error: any) {
        return error.message;
    }
});
