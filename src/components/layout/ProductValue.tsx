import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../common/Typography';

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

export function ProductValues() {
    return (
        <Box component="section" sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}>
            <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
                <Box
                    component="img"
                    src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="https://mui.com/static/themes/onepirate/productHowItWorks2.svg"
                                alt="suitcase"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h6" sx={{ my: 5 }}>
                                EXPLORE VOUCHER BENEFITS{' '}
                            </Typography>
                            <Typography variant="h5">
                                {'Discover the latest voucher offers, from exclusive deals to must-have discounts'}
                                {', elevate your shopping experience with savings just a few clicks away.'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="https://mui.com/static/themes/onepirate/productValues3.svg"
                                alt="graph"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h6" sx={{ my: 5 }}>
                                MAXIMIZE YOUR WALLET{' '}
                            </Typography>
                            <Typography variant="h5">
                                {
                                    'Manage your funds, make secure payments, and enjoy financial freedom right at your fingertips, '
                                }
                                {'optimize your spending with our wallet feature.'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="https://mui.com/static/themes/onepirate/productHowItWorks3.svg"
                                alt="clock"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h6" sx={{ my: 5 }}>
                                LATEST ANNOUNCEMENTS
                            </Typography>
                            <Typography variant="h5">
                                {'Stay informed with our quick updates, '}
                                {'be the first to know.'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
