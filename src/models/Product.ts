export interface Product {
    id: number;
    title: string;
    summary: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    description?: string[];
}
