import { Product, ListResponse, ObjectResponse, Category } from '../models';
import axiosClient from './axiosClient';

export const productsApi = {
    getAllProducts(): Promise<ListResponse<Product>> {
        const url = 'api/products';
        return axiosClient.get(url);
    },
    getAllCategory(): Promise<ListResponse<Category>> {
        const url = 'api/categories';
        return axiosClient.get(url);
    },
    getProductByCategory(category: string): Promise<ListResponse<Product>> {
        const url = `api/products?category=${category}`;
        return axiosClient.get(url);
    },
    getProductById(id: string): Promise<ObjectResponse<Product>> {
        const url = `api/products/${id}`;
        return axiosClient.get(url);
    },
    deleteProduct(id: any) {
        const url = `api/products/${id}`;
        return axiosClient.delete(url);
    },
    updateProduct(data: Partial<Product>): Promise<Product> {
        const url = `api/products/${data.id}`;
        return axiosClient.put(url, data);
    },
    addProduct(data: Product) {
        const url = 'api/products';
        return axiosClient.post(url, data);
    },
};
