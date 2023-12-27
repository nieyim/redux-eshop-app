import { Button, List, ListItem, Paper, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { cartApi, orderApi } from '../../../api';
import { useAppSelector } from '../../../app/hooks';
import { Cart, Order, OrderProduct } from '../../../models';
import { priceCalculate } from '../../../utils/priceCalculate';
import { selectCartList } from '../cartSlice';

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

    const handleOrder = async () => {
        try {
            // Fetch products from cartAPI
            const cart = (await cartApi.getAll()).data;
            const products = cart.map((product) => product.products);

            const orderProducts: OrderProduct[] = cart.map((item) => ({
                ...item.products,
                quantity: item.quantity,
            }));

            // Calculate totalProducts and totalQuantity
            const totalProducts = products.length;
            const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

            // Prepare payload for addCart
            const orderData: Order = {
                products: orderProducts,
                total: subtotal,
                discountedTotal: appliedCoupon === 'sale' ? parseFloat(totalWithDiscount) : subtotal,
                userId: 1, // Hardcoded user ID
                totalProducts,
                totalQuantity,
                id: 0, // This will be auto-generated
            };

            // Make the API call to addCart
            await orderApi.addCart(orderData);

            // Handle the response as needed (e.g., redirect to a confirmation page)
            toast.success('Order placed successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: true,
            });
        } catch (error) {
            // Handle errors (e.g., display an error message to the user)
            toast.error('Error placing order. Please try again!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: true,
            });
        }
    };

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
                onClick={() => handleOrder()}
                variant="contained"
                color="secondary"
                sx={{ borderRadius: '50px', mt: 1 }}
                disableElevation
                fullWidth
                size="large"
            >
                Confirm Order
            </Button>
            <ToastContainer />
        </Paper>
    );
}
