import { Category, Product } from '../../../models';

export interface ProductState {
    loading: boolean;
    error: string | null;
    productList: Product[];
    addNewProduct: Product;
    categoryList: Category[];
}
