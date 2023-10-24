import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    SvgIcon,
    Typography,
    useTheme,
    LinearProgress,
} from '@mui/material';
import Chart from 'react-apexcharts';
import { IconMappings } from '../../models';
import { useAppSelector } from '../../app/hooks';
import { selectPieChart } from '../../features/dashboard/dashboardSlice';
import ManIcon from '@mui/icons-material/Man';
import Woman2Icon from '@mui/icons-material/Woman2';
import { selectIsLoading } from '../../features/auth/authSlice';
import { useState, useEffect } from 'react';
import React from 'react';

const useChartOptions = (labels: string[]) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
        },
        colors: [theme.palette.info.main, theme.palette.secondary.main, theme.palette.warning.main],
        dataLabels: {
            enabled: false,
        },
        labels,
        legend: {
            show: false,
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
            },
        },
        states: {
            active: {
                filter: {
                    type: 'none',
                },
            },
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },
        stroke: {
            width: 0,
        },
        theme: {
            mode: theme.palette.mode,
        },
        tooltip: {
            fillSeriesColor: false,
        },
    };
};

const iconMap: IconMappings = {
    Male: (
        <SvgIcon>
            <ManIcon />
        </SvgIcon>
    ),
    Female: (
        <SvgIcon>
            <Woman2Icon />
        </SvgIcon>
    ),
};

export const CategoryChart = () => {
    const data = useAppSelector(selectPieChart);
    const loading = useAppSelector(selectIsLoading);

    const labels = data.map((item: any) => item.name).map((item) => item.charAt(0).toUpperCase() + item.slice(1));
    const chartSeries = data.map((item: any) => item.value);

    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowLoadingSpinner(false);
        }, 500); // 2 seconds delay
    }, [loading]);

    const chartOptions = useChartOptions(labels);

    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 5,
                boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
            }}
        >
            <CardHeader title="User Gender Distribution" />
            <CardContent>
                {showLoadingSpinner ? (
                    <LinearProgress color="secondary" />
                ) : (
                    <React.Fragment>
                        <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
                        <Stack alignItems="center" direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                            {chartSeries.map((item, index) => {
                                const label = labels[index];

                                return (
                                    <Box
                                        key={label}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {iconMap[label]}
                                        <Typography sx={{ my: 1 }} variant="h6">
                                            {label}
                                        </Typography>
                                        <Typography color="text.secondary" variant="subtitle2">
                                            {item}%
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </React.Fragment>
                )}
            </CardContent>
        </Card>
    );
};
