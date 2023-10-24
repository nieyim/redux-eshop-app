import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Avatar, Card, CardContent, LinearProgress, Stack, SvgIcon, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectIsLoading } from '../../features/auth/authSlice';
import { useState, useEffect } from 'react';
import { IconMappings } from '../../models';

export const StatisticItems = (props: { value: number; sx: any; backGround: string; iconName: string }) => {
    const iconMappings: IconMappings = {
        Users: <GroupIcon />,
        Products: <LocalShippingIcon />,
        Categories: <ListIcon />,
        Posts: <CommentIcon />,
        // Add more icon mappings as needed
    };

    const loading = useAppSelector(selectIsLoading);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowLoadingSpinner(false);
        }, 1000); // 2 seconds delay
    }, [loading]);

    return (
        <Card sx={props.sx}>
            <CardContent
                sx={{
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px',
                    },
                }}
            >
                {showLoadingSpinner ? (
                    <LinearProgress color="secondary" />
                ) : (
                    <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                Total {props.iconName}
                            </Typography>
                            <Typography variant="h4">{props.value}</Typography>
                        </Stack>
                        <Avatar
                            sx={{
                                backgroundColor: props.backGround,
                                height: 56,
                                width: 56,
                            }}
                        >
                            <SvgIcon>{iconMappings[props.iconName]}</SvgIcon>
                        </Avatar>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};
