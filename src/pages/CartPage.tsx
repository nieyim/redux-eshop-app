import { Box, Button, Container, Grid } from '@mui/material';
import * as React from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { useAppDispatch } from '../app/hooks';
import { cartThunk } from '../features/cart/cartThunk';
import { useEffect, useState } from 'react';
import { CartCoupon, CartTable, CartTotal } from '../features/cart/components';

export interface CartPageProps {}

export function CartPage(props: CartPageProps) {
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    const handleApplyCoupon = (couponCode: string) => {
        setAppliedCoupon(couponCode);
    };

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
                        <Grid item xs={12} my={3}>
                            <Button variant="contained" color="primary" disableElevation href="/products">
                                Continue Shopping
                            </Button>
                        </Grid>
                        <Grid container item xs={12} my={3}>
                            <Grid item xs={12} md={6} mb={3}>
                                <CartCoupon onApplyCoupon={handleApplyCoupon} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CartTotal appliedCoupon={appliedCoupon} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <PublicFooter />
        </React.Fragment>
    );
}
