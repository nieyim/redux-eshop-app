import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import Typography from '../../../components/common/Typography';
import Snackbar from '../../../components/common/Snackbar';

export function HomeCTA() {
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="section" sx={{ mt: 10, display: 'flex' }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: 'warning.main',
                            py: 8,
                            px: 3,
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
                            <Typography variant="h2" component="h2" gutterBottom>
                                Receive offers
                            </Typography>
                            <Typography variant="h5">
                                Experience a world of special offers, right at your fingertips.
                            </Typography>
                            <TextField
                                placeholder="Your email"
                                variant="outlined"
                                sx={{ width: '100%', mt: 3, mb: 2 }}
                                InputProps={{
                                    style: {
                                        backgroundColor: 'white',
                                    },
                                }}
                            />
                            <Button type="submit" color="primary" variant="contained" sx={{ width: '100%' }}>
                                Keep me updated
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -67,
                            left: -67,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            background: 'url(https://mui.com/static/themes/onepirate/productCTAImageDots.png)',
                        }}
                    />
                    <Box
                        component="img"
                        src="https://blog.thinkingschool.vn/wp-content/uploads/2021/01/Shopping.jpg"
                        alt="call to action"
                        sx={{
                            position: 'absolute',
                            top: -28,
                            left: -28,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: 600,
                        }}
                    />
                </Grid>
            </Grid>
            <Snackbar open={open} closeFunc={handleClose} message="We will send you our best offers, once a week." />
        </Container>
    );
}
