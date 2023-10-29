import FilterListIcon from '@mui/icons-material/FilterList';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCategoryList } from '../../features/product/productSlice';
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

export function ProductFilters({
    openFilter,
    onOpenFilter,
    onCloseFilter,
    onChangeFilterOptions,
}: ProductFiltersProps) {
    const [selectedRating, setSelectedRating] = useState<number | null>(2); //Rating state
    const [selectedCategory, setSelectedCategory] = useState('All'); //Select Category state
    const [selectedPrice, setSelectedPrice] = useState('all');

    const handleCategoryChange = (event: any) => {
        // Handle Category Change
        setSelectedCategory(event.target.value);
    };

    const handlePriceChange = (event: any) => {
        // Handle Price Change
        setSelectedPrice(event.target.value);
    };

    const handleRatingChange = (event: any) => {
        // Handle Rating Change
        setSelectedRating(Number(event.target.value));
    };

    const handleClear = () => {
        setSelectedCategory('All');
        setSelectedPrice('all');
        setSelectedRating(2);
    };

    useEffect(() => {
        // Create an array to hold the filter options
        const filterOptions = [];

        // Handle category filter
        if (selectedCategory !== 'All') {
            filterOptions.push({
                field: 'category',
                operator: 'equals',
                value: selectedCategory,
            });
        }

        // Handle price filter
        switch (selectedPrice) {
            case 'below':
                filterOptions.push({
                    field: 'price',
                    operator: 'lessThan',
                    value: 100,
                });
                break;
            case 'between':
                filterOptions.push({
                    field: 'price',
                    operator: 'greaterThan',
                    value: 100,
                });
                filterOptions.push({
                    field: 'price',
                    operator: 'lessThan',
                    value: 500,
                });
                break;
            case 'above':
                filterOptions.push({
                    field: 'price',
                    operator: 'greaterThan',
                    value: 500,
                });
                break;
            default:
                // Default to no price filter
                break;
        }

        // Handle rating filter
        if (selectedRating) {
            filterOptions.push({
                field: 'rating',
                operator: 'greaterThan',
                value: selectedRating,
            });
        }

        // Pass the filter options to the callback function
        onChangeFilterOptions(filterOptions);
    }, [selectedRating, selectedCategory, selectedPrice]);

    const categoryData = useAppSelector(selectCategoryList); // Select Category List from State
    const categoryOpts = categoryData.map((item) => {
        // Transform Data to UI
        const words = item.title.split('-');
        const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    });

    const addAllOption = 'All';
    categoryOpts.unshift(addAllOption); // Add All options

    const renderCategory = (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    {categoryOpts.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
    const renderPrice = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Price</Typography>
            <RadioGroup value={selectedPrice} onChange={handlePriceChange}>
                {PRICE_OPTIONS.map((item) => (
                    <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                ))}
            </RadioGroup>
        </Stack>
    );

    const renderRating = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Rating</Typography>
            <Rating name="simple-controlled" value={selectedRating} onChange={handleRatingChange} />
        </Stack>
    );

    return (
        <>
            <Button
                endIcon={<FilterListIcon />}
                disableRipple
                color="inherit"
                onClick={onOpenFilter}
                sx={{
                    textTransform: 'capitalize',
                    '&.MuiButtonBase-root:hover': {
                        bgcolor: 'transparent',
                    },
                }}
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
                    <Button fullWidth size="large" onClick={handleClear} color="inherit" variant="outlined">
                        Clear All
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}
