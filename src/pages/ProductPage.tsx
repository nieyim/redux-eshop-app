import { Box, Container, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ProductCard } from '../components/common';
import { ProductFilters, ProductSort, PublicFooter, PublicHeader } from '../components/layout';
import { selectProductList } from '../features/product/productSlice';
import { productThunk } from '../features/product/productThunk';

export function ProductPage() {
    const [openFilter, setOpenFilter] = useState(false);
    const dispatch = useAppDispatch();
    const productList = useAppSelector(selectProductList);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    useEffect(() => {
        dispatch(productThunk());
    }, [dispatch]);

    return (
        <React.Fragment>
            <PublicHeader />
            <Box component="section" sx={{ p: 3, background: '#f0f2f4' }}>
                <Container maxWidth="lg">
                    <Stack
                        direction="row"
                        alignItems="center"
                        flexWrap="wrap-reverse"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >
                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                            <ProductFilters
                                openFilter={openFilter}
                                onOpenFilter={handleOpenFilter}
                                onCloseFilter={handleCloseFilter}
                            />

                            <ProductSort />
                        </Stack>
                    </Stack>
                    <Grid container spacing={3}>
                        {productList.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* <ProductCartWidget /> */}
            </Box>
            <PublicFooter />
        </React.Fragment>
    );
}
