import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import React from 'react';
import { AppBar, Toolbar } from '../common';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}
const drawerWidth = 240;

const pages = ['home', 'products', 'blogs', 'about'];

export function PublicHeader(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
                E-Commerce
            </Typography>
            <Divider />
            <List>
                {pages.map((page) => (
                    <ListItem key={page} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href={`/${page}`}
                                sx={{ color: 'secondary.main', ml: 5, fontSize: 16 }}
                            >
                                {page}
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <AppBar position="fixed" component="nav">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/premium-themes/onepirate/"
                        sx={{
                            fontSize: 24,
                            justifyContent: 'flex-start',
                            flex: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {'e-commerce'}
                    </Link>
                    <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {pages.map((page) => (
                            <Link
                                key={page}
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href={`/${page}`}
                                sx={{ color: 'secondary.main', ml: 5, fontSize: 16 }}
                            >
                                {page}
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link color="inherit" variant="h6" underline="none" href="/login" sx={rightLink}>
                            {'Sign In'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            href="/register"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                        >
                            {'Sign Up'}
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar />
        </div>
    );
}
