import { Product } from './Product';

export interface Cart {
    id: number;
    products: CartProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartProduct extends Product {
    quantity: number;
}
