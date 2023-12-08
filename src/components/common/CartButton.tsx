import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCartList } from '../../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import { cartThunk } from '../../features/cart/cartThunk';
import { cartApi } from '../../api';

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
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        (async () => {
            try {
                const cart = (await cartApi.getAll()).data;
                setCount(cart.length);
            } catch (error) {
                console.log(error);
            }
        })();
    });

    console.log('rerender');
    return (
        <IconButton
            aria-label="cart"
            sx={{
                position: 'fixed',
                bottom: '50%', // Center vertically
                right: '16px', // Margin from the right
                transform: 'translateY(50%)', // Center vertically
            }}
        >
            <StyledBadge badgeContent={count} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    );
}
