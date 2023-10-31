import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi, userApi } from '../../api';
import { User } from '../../models';

export const blogThunk = createAsyncThunk('product/fetchData', async () => {
    try {
        const blogResponse = await postApi.getAll();
        const blogData = blogResponse.data;

        // Fetch user data for each blog's author and store it in a Map
        const usersMap = new Map();

        for (const blog of blogData) {
            if (!usersMap.has(blog.userId)) {
                const userResponse = await userApi.getUserById(blog.userId);
                const userData = userResponse.data;
                usersMap.set(blog.userId, userData);
            }
        }

        // Create an array of blogs with user data
        const blogsWithUserData = blogData.map((blog) => ({
            ...blog,
            user: usersMap.get(blog.userId) as User,
        }));

        return {
            blogList: blogsWithUserData,
        };
    } catch (error: any) {
        return error.message;
    }
});
