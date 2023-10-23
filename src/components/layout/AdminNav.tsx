import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Badge, Box, IconButton, Stack, SvgIcon, Tooltip, alpha, useMediaQuery } from '@mui/material';
import React from 'react';
import { useAppSelector, usePopover } from '../../app/hooks';
import { AccountPopover } from '../common/AccountPopover';
import { selectUserInfo } from '../../features/auth/authSlice';

export function AdminNav(props: any) {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const SIDE_NAV_WIDTH = 280;
    const TOP_NAV_HEIGHT = 64;
    const { onNavOpen } = props;
    const accountPopover = usePopover();
    const user = useAppSelector(selectUserInfo);

    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`,
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                    },
                    zIndex: (theme) => theme.zIndex.appBar,
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2,
                    }}
                >
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <SvgIcon fontSize="small">
                                    <MenuIcon />
                                </SvgIcon>
                            </IconButton>
                        )}
                        <Tooltip title="Search">
                            <IconButton>
                                <SvgIcon fontSize="small">
                                    <SearchIcon />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={2}>
                        <Tooltip title="Mail">
                            <IconButton>
                                <SvgIcon fontSize="small">
                                    <EmailIcon />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <IconButton>
                                <Badge badgeContent={4} color="success" variant="dot">
                                    <SvgIcon fontSize="small">
                                        <NotificationsIcon />
                                    </SvgIcon>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40,
                                bgcolor: '#ff3366',
                            }}
                            src={user?.image}
                        >
                            A
                        </Avatar>
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
                name={(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}
            />
        </React.Fragment>
    );
}
