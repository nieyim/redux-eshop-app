import { useEffect, useState } from 'react';
import { Product } from '../../../models';
import { productsApi } from '../../../api';
import Typography from '../../../components/common/Typography';
import React from 'react';
import { Grid } from '@mui/material';
import { ProductRelatedItem } from './ProductRelatedItem';

export interface ProductRealtedProps {
    category: string;
    currentProduct: Product;
}

export function ProductRealted(props: ProductRealtedProps) {
    const category = props.category;
    const currentproduct = props.currentProduct;
    const [realatedProduct, setRelatedProduct] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const realatedProduct = (await productsApi.getProductByCategory(category)).data;
                setRelatedProduct(realatedProduct);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [category]);

    return (
        <React.Fragment>
            <Typography variant="h4" marked="center" align="center" component="h2" fontSize={25} mb={4}>
                Realated Products
            </Typography>
            <Grid container spacing={2}>
                {realatedProduct
                    .filter((product) => product.id !== currentproduct.id)
                    .map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={3}>
                            <ProductRelatedItem product={product} />
                        </Grid>
                    ))}
            </Grid>
        </React.Fragment>
    );
}
