import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Product } from '../../models';

// import Label from 'src/components/label';

// ----------------------------------------------------------------------

export function ProductCard({ product }: { product: Product }) {
    //   const renderStatus = (
    //     <Label
    //       variant="filled"
    //       color='success'
    //       sx={{
    //         zIndex: 9,
    //         top: 16,
    //         right: 16,
    //         position: 'absolute',
    //         textTransform: 'uppercase',
    //       }}
    //     >
    //       {product.status}
    //     </Label>
    //   );

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
        />
    );

    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

    const renderPrice = (
        <Typography variant="h6" fontSize={15}>
            <Typography
                component="span"
                variant="h6"
                fontSize={15}
                sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                }}
            >
                ${product.price}
            </Typography>
            &nbsp; ${discountedPrice}
        </Typography>
    );

    return (
        <Card
            sx={{
                borderRadius: 5,
                backgroundColor: '#fff5f8',
            }}
        >
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {/* {product.discountPercentage > 0 && renderStatus} */}

                {renderImg}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover" variant="h4" noWrap fontSize={18} textTransform="capitalize">
                    {product.title}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {renderPrice}
                </Stack>
            </Stack>
        </Card>
    );
}
