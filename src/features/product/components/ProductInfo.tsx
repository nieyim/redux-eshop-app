import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Box, Button, ButtonProps, IconButton, IconButtonProps, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { Product } from '../../../models';
import { addToCart } from '../../cart/cartSlice';
import { cartApi } from '../../../api';
import { priceCalculate } from '../../../utils/priceCalculate';
import { ToastContainer, toast } from 'react-toastify';

export interface ProductInfoProps {
    product: Product;
}

export function ProductInfo(props: ProductInfoProps) {
    const product = props.product;
    const discountedPrice = priceCalculate(product.price, product.discountPercentage);
    const [quantity, setQuantity] = useState(1);
    const [reaction, setReaction] = useState(false);
    const dispatch = useAppDispatch();

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity === 0) return;
        setQuantity(quantity - 1);
    };

    const handleFavorite = () => {
        setReaction(!reaction);
    };

    const QuantityButton = styled(Button)<ButtonProps>({
        height: 50,
        width: 150,
        display: 'flex',
        borderRadius: '50px',
        border: '1px solid #ebebeb',
        backgroundColor: 'white',
        color: '#212529',
        fontWeight: '400',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#fff',
        },
    });

    const AddToCartButton = styled(Button)<ButtonProps>({
        height: 50,
        borderRadius: '50px',
    });

    const FunctionButton = styled(IconButton)<IconButtonProps>({
        height: 50,
        width: 50,
        borderRadius: '50px',
        border: '1px solid #ebebeb',
    });

    const handleAddToCart = async () => {
        try {
            const data = {
                products: product,
                quantity: quantity,
            };

            // Call API to check if the product is already in the cart
            const cartItem = await cartApi.checkCartItem(data.products.id);

            // If the product is already in the cart, update the quantity
            if (cartItem) {
                const updatedCartItem = {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity,
                };

                // Call API to update the quantity
                await cartApi.updateCartItem(updatedCartItem);
            } else {
                // If the product is not in the cart, add it
                await cartApi.addCart(data);
            }
            // Dispatch the addToCart action to update the local state
            dispatch(addToCart(data));
            toast.success('Product added to the cart successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'dark',
                hideProgressBar: true,
            });
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    return (
        <Box mb={4}>
            <Typography variant="h4" fontSize={32} fontWeight={600}>
                {product.title}
            </Typography>
            <Typography variant="body1" fontSize={14}>
                Brand: {product.brand}
            </Typography>
            <Rating name="two" value={product.rating} precision={0.5} readOnly size="small" sx={{ mt: 1.5, mb: 2 }} />
            <Box display="flex" flexDirection="row" alignItems="baseline" mb={3.5}>
                <Typography variant="h5" color="secondary" sx={{ mr: 2 }} fontSize={32} fontWeight={600}>
                    $ {discountedPrice}
                </Typography>
                {product.discountPercentage !== 0 && (
                    <Typography fontSize={20} color="#b1b0b0" sx={{ textDecoration: 'line-through' }}>
                        $ {product.price}
                    </Typography>
                )}
            </Box>
            <Typography variant="body2" fontSize={16} mb={3.5}>
                {product.summary}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body1" fontSize={16} fontWeight={600} display="flex">
                        Quantity:
                    </Typography>
                    <QuantityButton
                        variant="contained"
                        startIcon={<RemoveIcon onClick={handleDecrease} />}
                        endIcon={<AddIcon onClick={handleIncrease} />}
                        disableRipple
                        disableElevation
                    >
                        {quantity}
                    </QuantityButton>
                </Stack>

                <AddToCartButton
                    variant="contained"
                    startIcon={<ShoppingBagIcon />}
                    color="secondary"
                    disableElevation
                    sx={{ display: 'flex' }}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </AddToCartButton>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <FunctionButton onClick={handleFavorite}>
                        <FavoriteBorderRoundedIcon color={reaction ? 'secondary' : 'inherit'} />
                    </FunctionButton>
                    <FunctionButton>
                        <ShareRoundedIcon />
                    </FunctionButton>
                </Stack>
            </Stack>
            <ToastContainer />
        </Box>
    );
}
