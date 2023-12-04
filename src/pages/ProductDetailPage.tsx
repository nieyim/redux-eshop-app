import HomeIcon from '@mui/icons-material/Home';
import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsApi } from '../api';
import { PublicFooter, PublicHeader } from '../components/layout';
import { ProductCarousel, ProductInfo, ProductTab } from '../features/product/components';
import { Product } from '../models';

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

    const renderBreadcrumbs = (
        <Breadcrumbs aria-label="breadcrumb" separator="›">
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="text.primary" href="/">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
                href="/products"
            >
                Products
            </Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
                {currentProduct?.title}
            </Typography>
        </Breadcrumbs>
    );

    return (
        <React.Fragment>
            <PublicHeader />
            <Box component="section" sx={{ p: 3 }}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} my={2}>
                            {renderBreadcrumbs}
                        </Grid>
                        <Grid item xs={12} container mt={3} spacing={5}>
                            <Grid item xs={12} lg={6}>
                                <ProductCarousel image={currentProduct?.images} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                {currentProduct && <ProductInfo product={currentProduct} />}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} my={2}>
                            {currentProduct && <ProductTab product={currentProduct} />}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <PublicFooter />
        </React.Fragment>
    );
}
