import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../app/hooks';
import { selectCartList } from '../../features/cart/cartSlice';
import { Tooltip } from '@mui/material';

export interface CartButtonProps {}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export function CartButton(props: CartButtonProps) {
    const cartList = useAppSelector(selectCartList);
    const itemCount = cartList.length;
    console.log(cartList);
    return (
        <Tooltip title={`You have ${itemCount} items in your cart`}>
            <IconButton
                aria-label="cart"
                sx={{
                    position: 'fixed',
                    bottom: '50%', // Center vertically
                    right: '16px', // Margin from the right
                    transform: 'translateY(50%)', // Center vertically
                }}
                href="/carts"
            >
                <StyledBadge badgeContent={itemCount} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </Tooltip>
    );
}
