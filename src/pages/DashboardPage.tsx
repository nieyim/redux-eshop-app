import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { StatisticItems } from '../components/common';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    selectUserCount,
    selectProductCount,
    selectCategoryCount,
    selectPostCount,
    selectBarChart,
} from '../features/dashboard/dashboardSlice';
import { dashboardThunk } from '../features/dashboard/dashboardThunk';
import { TopPriceChart } from '../components/common/TopPriceChart';
import { userApi } from '../api';

export function DashboardPage() {
    const dispatch = useAppDispatch();
    const userCount = useAppSelector(selectUserCount);
    const productCount = useAppSelector(selectProductCount);
    const categoryCount = useAppSelector(selectCategoryCount);
    const postCount = useAppSelector(selectPostCount);
    const cartList = useAppSelector(selectBarChart);

    // Extract the 'total' and 'discountedTotal' values using map()
    const totalArray = cartList.map((item) => item.total);
    const discountedTotalArray = cartList.map((item) => item.discountedTotal);
    const userIds = cartList.map((item) => item.userId);
    const userFirstNames: string[] = [];

    (async () => {
        for (const userId of userIds) {
            try {
                const response = await userApi.getUserById(userId); // Replace with your API call
                const user = response.data;
                userFirstNames.push(user.firstName);
            } catch (error: any) {
                console.log(error.message);
            }
        }
    })();

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
                            <TopPriceChart
                                chartSeries={[
                                    {
                                        name: 'Total Price',
                                        data: totalArray,
                                    },
                                    {
                                        name: 'Price After Discount',
                                        data: discountedTotalArray,
                                    },
                                ]}
                                sx={{
                                    height: '100%',
                                    borderRadius: 5,
                                    boxShadow:
                                        '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                                }}
                                username={userFirstNames}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}></Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}
