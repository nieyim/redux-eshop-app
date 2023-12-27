import { Box } from '@material-ui/core';
import { Button, FormControl, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export interface CartCouponProps {
    onApplyCoupon: (couponCode: string) => void;
}

export function CartCoupon({ onApplyCoupon }: CartCouponProps) {
    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = () => {
        onApplyCoupon(couponCode);
        if (couponCode === 'sale') {
            toast.success('Coupon used successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: true,
            });
        } else {
            toast.error('Wrong coupon code. Please try again!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: true,
            });
        }
        setCouponCode('');
    };
    return (
        <Box>
            <Typography variant="h6">Discount Code</Typography>
            <form>
                <FormControl sx={{ width: { xs: '100%', sm: '370px' } }}>
                    <OutlinedInput
                        placeholder="Enter your coupon code"
                        sx={{ borderRadius: '50px', pr: 0.5 }}
                        endAdornment={
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ borderRadius: '50px', width: 150, height: 45 }}
                                disableElevation
                                onClick={handleApplyCoupon}
                            >
                                Apply
                            </Button>
                        }
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                </FormControl>
            </form>
            <ToastContainer />
        </Box>
    );
}
