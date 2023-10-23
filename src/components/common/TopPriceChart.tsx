import { Card, CardContent, CardHeader } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const useChartOptions = () => {
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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

export const TopPriceChart = (props: any) => {
    const { chartSeries, sx } = props;
    const chartOptions = useChartOptions();

    return (
        <Card sx={sx}>
            <CardHeader title="Recent Orders Value" />
            <CardContent>
                <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
            </CardContent>
        </Card>
    );
};

TopPriceChart.protoTypes = {
    chartSeries: PropTypes.array.isRequired,
    sx: PropTypes.object,
};
