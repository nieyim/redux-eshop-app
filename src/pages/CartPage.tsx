import { Box, Button, Container, Grid } from '@mui/material';
import * as React from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import CartTable from '../features/cart/components/CartTable';
import { useAppDispatch } from '../app/hooks';
import { cartThunk } from '../features/cart/cartThunk';
import { useEffect } from 'react';

export interface CartPageProps {}

export function CartPage(props: CartPageProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(cartThunk());
    }, [dispatch]);

    return (
        <React.Fragment>
            <PublicHeader />
            <Box component="section" sx={{ p: 3 }}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} my={2}>
                            <CartTable />
                        </Grid>
                        <Grid item xs={12} my={2}>
                            <Button variant="contained" color="primary" disableElevation href="/products">
                                Continue Shopping
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <PublicFooter />
        </React.Fragment>
    );
}
