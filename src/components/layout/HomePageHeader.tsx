import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { AppBar, Toolbar } from '../common';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

const pages = ['home', 'products', 'blogs', 'about', 'contact'];

export function HomePageHeader() {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/premium-themes/onepirate/"
                        sx={{ fontSize: 24, justifyContent: 'flex-start', flex: 1 }}
                    >
                        {'e-commerce'}
                    </Link>
                    <Box>
                        {pages.map((page) => (
                            <Link
                                key={page}
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href="/premium-themes/onepirate/sign-in/"
                                sx={{ color: 'secondary.main', ml: 3, fontSize: 16 }}
                            >
                                {page}
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            href="/premium-themes/onepirate/sign-in/"
                            sx={rightLink}
                        >
                            {'Sign In'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            href="/premium-themes/onepirate/sign-up/"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                        >
                            {'Sign Up'}
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}
