import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterOptions } from '../../pages/ProductPage';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
];
export const CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories', 'some', 'thing', 'here'];
export const PRICE_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'below', label: 'Below $100' },
    { value: 'between', label: 'Between $100 - $500' },
    { value: 'above', label: 'Above $500' },
];

// ----------------------------------------------------------------------
interface ProductFiltersProps {
    openFilter: boolean;
    onOpenFilter: () => void;
    onCloseFilter: () => void;
    onChangeFilterOptions: (options: FilterOptions[]) => void;
}

export function ProductFilters({ openFilter, onOpenFilter, onCloseFilter }: ProductFiltersProps) {
    const [value, setValue] = useState<number | null>(2);

    const renderCategory = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Category</Typography>
            <RadioGroup>
                {CATEGORY_OPTIONS.map((item) => (
                    <FormControlLabel
                        key={item}
                        value={item}
                        control={
                            <Radio
                                sx={{
                                    color: 'primary',
                                    '&.Mui-checked': {
                                        color: 'primary',
                                    },
                                }}
                            />
                        }
                        label={item}
                    />
                ))}
            </RadioGroup>
        </Stack>
    );
    const renderPrice = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Price</Typography>
            <RadioGroup>
                {PRICE_OPTIONS.map((item) => (
                    <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                ))}
            </RadioGroup>
        </Stack>
    );

    const renderRating = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Rating</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Stack>
    );

    return (
        <>
            <Button
                endIcon={<FilterListIcon />}
                disableRipple
                color="inherit"
                onClick={onOpenFilter}
                sx={{ textTransform: 'capitalize' }}
            >
                Filters&nbsp;
            </Button>

            <Drawer
                anchor="right"
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, border: 'none', color: '#000', backgroundColor: '#fff' },
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        Filters
                    </Typography>
                    <IconButton onClick={onCloseFilter}></IconButton>
                </Stack>

                <Divider />

                <Box>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {renderCategory}
                        {renderPrice}

                        {renderRating}
                    </Stack>
                </Box>

                <Box sx={{ p: 3 }}>
                    <Button fullWidth size="large" type="submit" color="inherit" variant="outlined">
                        Clear All
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}
