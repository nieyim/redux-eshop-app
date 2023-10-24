import { Card, CardContent, CardHeader, LinearProgress } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import { useAppSelector } from '../../app/hooks';
import { selectIsLoading } from '../../features/auth/authSlice';
import { selectBarChartCart, selectBarChartUser } from '../../features/dashboard/dashboardSlice';
import { useState, useEffect } from 'react';

const useChartOptions = (userNameList: string[]) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        colors: [theme.palette.info.main, alpha(theme.palette.info.main, 0.25)],
        dataLabels: {
            enabled: false,
        },
        fill: {
            opacity: 1,
            type: 'solid',
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            show: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '20px',
            },
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2,
        },
        theme: {
            mode: theme.palette.mode,
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true,
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true,
            },
            categories: userNameList,
            labels: {
                offsetY: 5,
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value: any) => (value > 0 ? `${value} $` : `${value}`),
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
    };
};

export const TopPriceChart = () => {
    // Extract the 'total' and 'discountedTotal' values using map()
    const cartList = useAppSelector(selectBarChartCart);
    const loading = useAppSelector(selectIsLoading);
    const userNameList = useAppSelector(selectBarChartUser);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowLoadingSpinner(false);
        }, 1000); // 2 seconds delay
    }, [loading]);

    const totalArray = cartList.map((item) => item.total);
    const discountedTotalArray = cartList.map((item) => item.discountedTotal);

    const series = [
        {
            name: 'Total Price',
            data: totalArray,
        },
        {
            name: 'Price After Discount',
            data: discountedTotalArray,
        },
    ];

    const chartOptions = useChartOptions(userNameList);

    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 5,
                boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
            }}
        >
            <CardHeader title="Recent Orders Value" />
            <CardContent>
                {showLoadingSpinner ? (
                    <LinearProgress color="secondary" />
                ) : (
                    <Chart height={350} options={chartOptions} series={series} type="bar" width="100%" />
                )}
            </CardContent>
        </Card>
    );
};
