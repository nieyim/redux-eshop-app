import { Box, Container, Grid, LinearProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ProductCard } from '../components/common';
import { ProductFilters, ProductSort, PublicFooter, PublicHeader } from '../components/layout';
import { selectIsLoading, selectProductList } from '../features/product/productSlice';
import { productThunk } from '../features/product/productThunk';
import { Product } from '../models';

export interface FilterOptions {
    field: string;
    operator: string;
    value: string | number;
}
export function ProductPage() {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectProductList);
    const [productList, setProductList] = useState<Product[]>(data);
    const [openFilter, setOpenFilter] = useState(false);
    const loading = useAppSelector(selectIsLoading);

    // Filter state
    const [filterOptions, setFilterOptions] = useState<FilterOptions[]>([]);

    // Sort state
    const [sortOption, setSortOption] = useState('Name');

    // Search state
    const [searchText, setSearchText] = useState('');

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    //--------------------------------

    const handleFilter = (options: FilterOptions[]) => {
        setFilterOptions(options);
    };
    const handleSort = (options: string) => {
        setSortOption(options);
    };

    useEffect(() => {
        let conditionList = [...data];

        switch (sortOption) {
            case 'Name':
                conditionList.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Discount: High-Low':
                conditionList.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            case 'Discount: Low-High':
                conditionList.sort((a, b) => a.discountPercentage - b.discountPercentage);
                break;
            case 'Price: High-Low':
                conditionList.sort((a, b) => {
                    const aPrice = a.price - (a.price * a.discountPercentage) / 100;
                    const bPrice = b.price - (b.price * b.discountPercentage) / 100;
                    return bPrice - aPrice;
                });
                break;
            case 'Price: Low-High':
                conditionList.sort((a, b) => {
                    const aPrice = a.price - (a.price * a.discountPercentage) / 100;
                    const bPrice = b.price - (b.price * b.discountPercentage) / 100;
                    return aPrice - bPrice;
                });
                break;
            default:
                // Default to sorting by name
                break;
        }

        setProductList(conditionList);
    }, [data, sortOption, filterOptions]);

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
                                onChangeFilterOptions={handleFilter}
                            />

                            <ProductSort onSort={handleSort} />
                        </Stack>
                    </Stack>
                    <Grid container spacing={3}>
                        {loading ? (
                            <LinearProgress color="secondary" />
                        ) : (
                            productList.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Container>

                {/* <ProductCartWidget /> */}
            </Box>
            <PublicFooter />
        </React.Fragment>
    );
}
