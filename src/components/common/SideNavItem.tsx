import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { Box, ButtonBase } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function SideNavItem() {
    // Use local storage to store and retrieve the active index
    const storedActiveIndex = localStorage.getItem('activeIndex');
    const [active, setActive] = useState(storedActiveIndex ? parseInt(storedActiveIndex) : 0);

    const items = [
        { text: 'Dashboard', route: '/admin/dashboard', icon: <SignalCellularAltIcon /> },
        { text: 'Products', route: '/admin/products', icon: <ShoppingBagIcon /> },
        { text: 'Users', route: '/admin/users', icon: <PersonIcon /> },
        { text: 'Posts', route: '/admin/posts', icon: <FeedIcon /> },
        { text: 'Orders', route: '/admin/orders', icon: <ShoppingCartIcon /> },
    ];

    useEffect(() => {
        // Update local storage when the active index changes
        if (active !== null) {
            localStorage.setItem('activeIndex', active.toString());
        }
    }, [active]);

    return (
        <React.Fragment>
            {items.map((item, index) => (
                <li key={index}>
                    <ButtonBase
                        component={Link}
                        to={item.route}
                        sx={{
                            alignItems: 'center',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            pl: '16px',
                            pr: '16px',
                            py: '6px',
                            textAlign: 'left',
                            width: '100%',
                            backgroundColor: active === index ? 'primary.main' : 'transparent',
                            color: active === index ? 'common.white' : 'neutral.400',
                        }}
                        onClick={() => setActive(index)}
                    >
                        {item.icon}
                        <Box
                            component="span"
                            sx={{
                                alignItems: 'center',
                                color: 'neutral.400',
                                display: 'inline-flex',
                                justifyContent: 'center',
                                mr: 2,
                            }}
                        ></Box>
                        <Box
                            component="span"
                            sx={{
                                color: 'neutral.400',
                                flexGrow: 1,
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: '24px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.text}
                        </Box>
                    </ButtonBase>
                </li>
            ))}
        </React.Fragment>
    );
}
