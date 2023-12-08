import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi, userApi, postApi, orderApi } from '../../api';

export const dashboardThunk = createAsyncThunk('dashboard/fetchData', async () => {
    try {
        const productResponse = await productsApi.getAllProducts();
        const productData = productResponse.data; // All Products

        const userResponse = await userApi.getAll();
        const userData = userResponse.data; // All Users

        const categoryResponse = await productsApi.getAllCategory();
        const categoryData = categoryResponse.data; // All Categories

        const postResponse = await postApi.getAll();
        const postData = postResponse.data; // All Posts

        const orderResponse = await orderApi.getAll();
        const orderData = orderResponse.data; // All Carts

        const recentUserName = []; // 10 user buy recently

        const orderData2 = [...orderData]; // Mutate object
        const orderData3 = [...orderData]; // Mutate object

        const first10Ids = orderData2
            .sort((a, b) => b.id - a.id)
            .slice(0, 10)
            .map((cart) => cart.userId); // 10 user ID buy recently
        const recentOrderList = orderData3.sort((a, b) => b.id - a.id).slice(0, 10); // 10 cart recently

        for (const userId of first10Ids) {
            // Find the corresponding user in the userList
            const user = userData.find((user) => user.id === userId);

            // If a user with the matching ID is found, extract the firstName
            if (user) {
                recentUserName.push(user.firstName);
            }
        }

        interface GroupedItem {
            name: string;
            value: number;
        }

        const genderCount: GroupedItem[] = userData.reduce((result: GroupedItem[], item: any) => {
            const existingGroup = result.find((group: GroupedItem) => group.name === item.gender);
            if (existingGroup) {
                existingGroup.value++;
            } else {
                result.push({ name: item.gender, value: 1 });
            }
            return result;
        }, []);

        return {
            userName: recentUserName,
            orderList: recentOrderList,
            genderCount: genderCount,
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
