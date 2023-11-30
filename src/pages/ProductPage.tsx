import { Box, Container, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PublicFooter, PublicHeader } from '../components/layout';
import { selectIsLoading, selectProductList } from '../features/product/productSlice';
import { productThunk } from '../features/product/productThunk';
import { Product } from '../models';
import { ProductCard, ProductFilters, ProductSearch, ProductSort } from '../features/product/components';

export interface FilterOptions {
    field: string;
    operator: string;
    value: string | number;
}
export function ProductPage() {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectProductList);
    const loading = useAppSelector(selectIsLoading);

    const [productList, setProductList] = useState<Product[]>(data); // ProductList State
    const [openFilter, setOpenFilter] = useState(false); // FilterDrawer State
    const [filterOptions, setFilterOptions] = useState<FilterOptions[]>([]); // Filter State
    const [sortOption, setSortOption] = useState('Name'); // Sort State
    const [searchText, setSearchText] = useState(''); // Search State

    //--------------------------

    // Handle Open/Close Drawer Filter
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    // Handle Change Filter,Sort,Search Options
    const handleFilter = (options: FilterOptions[]) => {
        setFilterOptions(options);
    };
    const handleSort = (options: string) => {
        setSortOption(options);
    };
    const handleSearch = (options: string) => {
        setSearchText(options);
    };

    // ---------------------- useEffect To Render When Change Options
    useEffect(() => {
        let conditionList = [...data];

        // SEARCH
        if (searchText) {
            conditionList = conditionList.filter((product) =>
                product.title.toLowerCase().includes(searchText.toLowerCase()),
            );
        }

        // SORT
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
                break;
        }

        // FILTER
        for (const filterOption of filterOptions) {
            // Check if the field is "category"
            if (filterOption.field === 'category' && typeof filterOption.value === 'string') {
                // Modify the value for "category" field
                filterOption.value = filterOption.value.replace(/ /g, '-').toLowerCase();
            }

            switch (filterOption.field) {
                case 'category':
                    if (filterOption.operator === 'equals') {
                        conditionList = conditionList.filter((product) => product.category === filterOption.value);
                    }
                    break;
                case 'price':
                    if (filterOption.operator === 'lessThan') {
                        conditionList = conditionList.filter((product) => product.price <= Number(filterOption.value));
                    } else if (filterOption.operator === 'greaterThan') {
                        conditionList = conditionList.filter((product) => product.price >= Number(filterOption.value));
                    }
                    break;
                case 'rating':
                    conditionList = conditionList.filter((product) => product.rating >= Number(filterOption.value));
                    break;
                default:
                    break;
            }
        }

        setProductList(conditionList);
    }, [data, sortOption, filterOptions, searchText]);

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
                        justifyContent={{ xs: 'center', md: 'flex-end' }}
                        sx={{ mb: 5 }}
                    >
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexShrink={0} sx={{ my: 1 }}>
                            <ProductSearch onSearch={handleSearch} />
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
                        ) : productList.length === 0 ? ( // Check if productList is empty
                            <Typography variant="h6" sx={{ m: 10 }}>
                                No products found matching your criteria.
                            </Typography>
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
