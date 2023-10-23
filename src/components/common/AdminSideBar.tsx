import { Box, Divider, Drawer, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { Scrollbar } from './Scrollbar';
import { SideNavItem } from './SideNavItem';

export const AdminSideBar = (props: any) => {
    const { open, onClose } = props;
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    const content = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': {
                    height: '100%',
                },
                '& .simplebar-scrollbar:before': {
                    background: 'neutral.400',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                            p: '12px',
                        }}
                    >
                        <div>
                            <Typography color="inherit" variant="h6" fontSize={25}>
                                Administration
                            </Typography>
                        </div>
                    </Box>
                </Box>
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 3,
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                    >
                        <SideNavItem />
                    </Stack>
                </Box>
                <Divider sx={{ borderColor: 'neutral.700' }} />
            </Box>
        </Scrollbar>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.800',
                    color: 'common.white',
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

AdminSideBar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
