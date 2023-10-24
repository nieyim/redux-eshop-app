import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { StatisticItems } from '../components/common';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    selectUserCount,
    selectProductCount,
    selectCategoryCount,
    selectPostCount,
    selectBarChartUser,
    selectBarChartCart,
    selectPieChart,
} from '../features/dashboard/dashboardSlice';
import { dashboardThunk } from '../features/dashboard/dashboardThunk';
import { TopPriceChart, CategoryChart } from '../components/common';

export function DashboardPage() {
    const dispatch = useAppDispatch();
    const userCount = useAppSelector(selectUserCount);
    const productCount = useAppSelector(selectProductCount);
    const categoryCount = useAppSelector(selectCategoryCount);
    const postCount = useAppSelector(selectPostCount);

    useEffect(() => {
        dispatch(dashboardThunk());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: '#fcfcfc',
                }}
            >
                <Container maxWidth="xl" sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                        {/* Statistics */}
                        <Grid item xs={12} sm={6} lg={3}>
                            <StatisticItems
                                sx={{
                                    height: '100%',
                                    borderRadius: 5,
                                    boxShadow:
                                        '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                                }}
                                value={userCount}
                                backGround="secondary.main"
                                iconName="Users"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <StatisticItems
                                sx={{
                                    height: '100%',
                                    borderRadius: 5,
                                    boxShadow:
                                        '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                                }}
                                value={productCount}
                                backGround="success.main"
                                iconName="Products"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <StatisticItems
                                sx={{
                                    height: '100%',
                                    borderRadius: 5,
                                    boxShadow:
                                        '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                                }}
                                value={categoryCount}
                                backGround="warning.dark"
                                iconName="Categories"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <StatisticItems
                                sx={{
                                    height: '100%',
                                    borderRadius: 5,
                                    boxShadow:
                                        '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                                }}
                                value={postCount}
                                backGround="info.main"
                                iconName="Posts"
                            />
                        </Grid>
                        {/* Chart */}
                        <Grid item xs={12} lg={8}>
                            <TopPriceChart />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <CategoryChart />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}
