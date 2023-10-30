import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Product } from '../../models';
import { CustomLabel } from './CustomLabel';

// ----------------------------------------------------------------------

export function ProductCard({ product }: { product: Product }) {
    const renderStatus = <CustomLabel>-{product.discountPercentage}%</CustomLabel>;

    const renderImg = (
        <Box
            component="img"
            alt={product.title}
            src={product.thumbnail}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
            loading="lazy"
        />
    );

    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(0);

    const renderPrice = (
        <Typography variant="h6" fontSize={17}>
            <Typography
                component="span"
                variant="h6"
                fontSize={17}
                sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                }}
            >
                {product.discountPercentage > 0 ? '$' + product.price : ''}
            </Typography>
            &nbsp;${discountedPrice}
        </Typography>
    );

    return (
        <Card
            sx={{
                borderRadius: 5,
                color: '#fff',
                background: '#fff',
                boxShadow: 'rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px',
            }}
        >
            <Link href="/home" underline="none">
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    {product.discountPercentage > 0 && renderStatus}

                    {renderImg}
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                    <Link underline="hover" variant="h4" noWrap fontSize={15} textTransform="capitalize">
                        {product.title}
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        {renderPrice}
                    </Stack>
                </Stack>
            </Link>
        </Card>
    );
}
