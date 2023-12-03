import { Box, Rating, Stack, Typography, Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Product } from '../../../models';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

export interface ProductInfoProps {
    product: Product;
}

export function ProductInfo(props: ProductInfoProps) {
    const product = props.product;
    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(0);
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(quantity - 1);
    };

    const QuantityButton = styled(Button)<ButtonProps>({
        height: 50,
        width: 150,
        display: 'flex',
        borderRadius: '50px',
        border: '1px solid #ebebeb',
        boxShadow: 'none',
        backgroundColor: 'white',
        color: '#212529',
        fontWeight: '400',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#fff',
            boxShadow: 'none',
        },
    });

    return (
        <Box>
            <Typography variant="h4" fontSize={32} fontWeight={600}>
                {product.title}
            </Typography>
            <Typography variant="body1" fontSize={14}>
                Brand: {product.brand}
            </Typography>
            <Rating
                name="read-only"
                value={product.rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ mt: 1.5, mb: 2 }}
            />
            <Box display="flex" flexDirection="row" alignItems="baseline" mb={3.5}>
                <Typography variant="h4" color="#ca1515" sx={{ mr: 2 }} fontSize={32}>
                    $ {discountedPrice}
                </Typography>
                {product.discountPercentage !== 0 && (
                    <Typography fontSize={20} color="#b1b0b0" sx={{ textDecoration: 'line-through' }}>
                        $ {product.price}
                    </Typography>
                )}
            </Box>
            <Typography variant="body1" fontSize={16} mb={3.5}>
                {product.description}
            </Typography>
            <Stack flexDirection="row" alignItems="center">
                <Typography variant="body1" fontSize={16} fontWeight={600} display="flex">
                    Quantity:
                </Typography>
                <QuantityButton
                    variant="contained"
                    startIcon={<RemoveIcon onClick={handleDecrease} />}
                    endIcon={<AddIcon onClick={handleIncrease} />}
                >
                    {quantity}
                </QuantityButton>
            </Stack>
        </Box>
    );
}
