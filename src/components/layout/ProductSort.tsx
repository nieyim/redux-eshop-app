import { useState } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'name', label: 'Name' },
    { value: 'discountDesc', label: 'Discount: High-Low' },
    { value: 'discountAsc', label: 'Discount: Low-High' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
];

interface ProductSortProps {
    onSort: (option: string) => void; // Define a function prop to handle sorting
}

export function ProductSort({ onSort }: ProductSortProps) {
    const [open, setOpen] = useState(null);
    const [selectedOpts, setSelectedOpts] = useState('Name');

    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClick = (value: string) => {
        setSelectedOpts(value);
        setOpen(null);
        onSort(value);
    };

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                onClick={handleOpen}
                endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{ textTransform: 'capitalize' }}
            >
                Sort By:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {selectedOpts}
                </Typography>
            </Button>

            <Menu
                open={!!open}
                anchorEl={open}
                onClose={() => handleClick(selectedOpts)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            [`& .${listClasses.root}`]: {
                                p: 0,
                            },
                        },
                    },
                }}
            >
                {SORT_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === selectedOpts}
                        onClick={() => handleClick(option.label)}
                        sx={{ fontSize: 14 }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
