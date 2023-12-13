import {
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { priceCalculate } from '../../../utils/priceCalculate';
import { decreaseQuantity, increaseQuantity, removeFromCart, selectCartList } from '../cartSlice';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface CartTableProps {}

export default function CartTable(props: CartTableProps) {
    const dispatch = useAppDispatch();
    const cartList = useAppSelector(selectCartList);

    const handleClearButtonClick = (id: number) => {
        dispatch(removeFromCart(id));
    };
    const handleIncreaseQuantity = (id: number) => {
        dispatch(increaseQuantity(id));
    };
    const handleDecreaseQuantity = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    console.log(cartList);
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ textTransform: 'uppercase' }}>
                    <TableRow>
                        <TableCell sx={{ fontSize: 17 }}>Product</TableCell>
                        <TableCell align="center" sx={{ fontSize: 17 }}>
                            Price
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 17 }}>
                            Quantity
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 17 }}>
                            Total
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 17 }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartList.map((row) => {
                        const calculatedPrice = parseFloat(
                            priceCalculate(row.products.price, row.products.discountPercentage),
                        );
                        const totalPrice = calculatedPrice * row.quantity;

                        return (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Stack
                                        direction={{ xs: 'column', md: 'row' }}
                                        spacing={2}
                                        alignItems={{ xs: 'baseline', md: 'center' }}
                                    >
                                        <img
                                            alt="product"
                                            src={row.products.thumbnail}
                                            height={90}
                                            width={90}
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <Typography variant="body1" fontWeight={500}>
                                            {row.products.title}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" fontWeight={500} color="secondary">
                                        $ {calculatedPrice}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                                        <IconButton onClick={() => handleDecreaseQuantity(row.products.id)}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body1" fontWeight={500}>
                                            {row.quantity}
                                        </Typography>
                                        <IconButton onClick={() => handleIncreaseQuantity(row.products.id)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" fontWeight={500} color="secondary">
                                        $ {totalPrice}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Delete ">
                                        <IconButton onClick={() => handleClearButtonClick(row.products.id)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
