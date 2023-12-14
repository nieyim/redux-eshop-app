import { List, ListItem, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectCartList } from '../cartSlice';
import { Cart } from '../../../models';
import { priceCalculate } from '../../../utils/priceCalculate';
import { Button } from '../../../components/common';

export interface CartTotalProps {
    appliedCoupon: string | null;
}

export function CartTotal(props: CartTotalProps) {
    const cartList = useAppSelector(selectCartList);
    const appliedCoupon = props.appliedCoupon;

    const calculateTotalPrice = (cartList: Cart[]) => {
        let totalPrice = 0;

        // Iterate through each item in the cart
        for (const item of cartList) {
            const productPrice = parseFloat(priceCalculate(item.products.price, item.products.discountPercentage));
            const quantity = item.quantity;

            // Calculate the subtotal for the item (price * quantity)
            const subtotal = productPrice * quantity;

            // Add the subtotal to the total price
            totalPrice += subtotal;
        }
        return totalPrice;
    };

    const subtotal = calculateTotalPrice(cartList);
    const totalWithDiscount = (subtotal * 0.9).toFixed(0);

    return (
        <Paper sx={{ backgroundColor: '#f5f5f5', p: 5, ml: { xs: 0, lg: 24 } }} elevation={0} square>
            <Typography variant="h6">Cart Total</Typography>
            <List sx={{ fontWeight: 500 }}>
                <ListItem
                    disableGutters
                    secondaryAction={
                        <Typography variant="body1" fontWeight={500} color="secondary" fontSize={17}>
                            $ {subtotal}
                        </Typography>
                    }
                >
                    Subtotal
                </ListItem>
                {appliedCoupon === 'sale' && (
                    <ListItem
                        disableGutters
                        secondaryAction={
                            <Typography variant="body1" fontWeight={500} color="secondary" fontSize={17}>
                                -10%
                            </Typography>
                        }
                    >
                        Discount
                    </ListItem>
                )}
                <ListItem
                    disableGutters
                    secondaryAction={
                        <Typography variant="body1" fontWeight={500} color="secondary" fontSize={17}>
                            $ {appliedCoupon === 'sale' ? totalWithDiscount : subtotal}
                        </Typography>
                    }
                >
                    Total
                </ListItem>
            </List>
            <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: '50px', mt: 1 }}
                disableElevation
                fullWidth
            >
                Process to Checkout
            </Button>
        </Paper>
    );
}
