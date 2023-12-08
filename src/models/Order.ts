import { Product } from './Product';

export interface Order {
    id: number;
    products: OrderProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface OrderProduct extends Product {
    quantity: number;
}
