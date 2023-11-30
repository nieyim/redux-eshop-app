import React, { useEffect, useState } from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { useParams } from 'react-router-dom';
import { Product } from '../models';
import { productsApi } from '../api';
import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

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
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/products">
                Products
            </Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
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
                        <Grid item xs={12} container mt={6}>
                            <Grid item xs={12} md={6}>
                                T1
                            </Grid>
                            <Grid item xs={12} md={6}>
                                GenG
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <PublicFooter />
        </React.Fragment>
    );
}
