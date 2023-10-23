import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const StatisticItems = (props: any) => {
    const { value, sx } = props;

    return (
        <Card sx={sx}>
            <CardContent
                sx={{
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px',
                    },
                }}
            >
                <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
                    <Stack spacing={1}>
                        <Typography color="text.secondary" variant="overline">
                            Total Profit
                        </Typography>
                        <Typography variant="h4">{value}</Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: 'success.main',
                            height: 56,
                            width: 56,
                        }}
                    >
                        <SvgIcon>{/* <CurrencyDollarIcon /> */}</SvgIcon>
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
};

StatisticItems.propTypes = {
    value: PropTypes.string,
    sx: PropTypes.object,
};
