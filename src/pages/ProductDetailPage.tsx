import React, { useEffect, useState } from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { useParams } from 'react-router-dom';
import { Product } from '../models';
import { productsApi } from '../api';

export function ProductDetailPage() {
    const { productID } = useParams<{ productID: string }>(); // Extract the productID from the URL params
    const [currentProduct, setCurentProduct] = useState<Product>();

    useEffect(() => {
        if (!productID) return;
        (async () => {
            try {
                const product = (await productsApi.getProductById(productID)).data;
                setCurentProduct(product);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [productID]);

    console.log(currentProduct);

    return (
        <React.Fragment>
            <PublicHeader />
            <PublicFooter />
        </React.Fragment>
    );
}
