import { Card, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { Product } from '../../../models';

export interface ProductRelatedItemProps {
    product: Product;
}

export function ProductRelatedItem(props: ProductRelatedItemProps) {
    const product = props.product;
    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(0);

    return (
        <Card elevation={0} sx={{ borderRadius: '0px' }}>
            <CardMedia
                component="img"
                image={product.thumbnail}
                alt="product image"
                height={300}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Stack direction="column" alignItems="center" textAlign="center" spacing={1}>
                    <Typography
                        variant="h5"
                        color="primary"
                        height="100%"
                        fontWeight={500}
                        fontSize={15}
                        component="a"
                        href={`/products/${product.id}`}
                        sx={{ textDecoration: 'none' }}
                    >
                        {product.title}
                    </Typography>
                    <Rating
                        name="one"
                        value={product.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ fontSize: 13 }}
                    />
                    <Typography variant="h5" fontSize={16} fontWeight={700}>
                        $ {discountedPrice}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
