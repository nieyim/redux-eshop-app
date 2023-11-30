import { Box, Rating, Typography } from '@mui/material';
import { Product } from '../../../models';

export interface ProductInfoProps {
    product: Product;
}

export function ProductInfo(props: ProductInfoProps) {
    const product = props.product;
    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(0);
    return (
        <Box>
            <Typography variant="h4" fontSize={32} fontWeight={600}>
                {product.title}
            </Typography>
            <Typography variant="body1">Brand: {product.brand}</Typography>
            <Rating name="read-only" value={product.rating} precision={0.5} readOnly size="small" sx={{ my: 1.5 }} />
            <Box display="flex" flexDirection="row" alignItems="baseline">
                <Typography variant="h4" color="#ca1515" sx={{ mr: 2 }}>
                    $ {discountedPrice}
                </Typography>
                <Typography fontSize={20} color="#b1b0b0" sx={{ textDecoration: 'line-through' }}>
                    $ {product.price}
                </Typography>
            </Box>
        </Box>
    );
}
