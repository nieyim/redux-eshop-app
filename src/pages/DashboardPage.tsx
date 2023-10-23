import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { StatisticItems } from '../components/common';

export function DashboardPage() {
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
                        <Grid item xs={12} sm={6} lg={3}>
                            <StatisticItems
                                sx={{
                                    height: '100%',
                                    borderRadius: 5,
                                    boxShadow:
                                        '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                                }}
                                value="$15k"
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
                                value="$15k"
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
                                value="$15k"
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
                                value="$15k"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}
