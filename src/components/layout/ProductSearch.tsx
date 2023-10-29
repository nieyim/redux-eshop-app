import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../common';

interface ProductSearchProps {
    onSearch: (option: string) => void; // Define a function prop to handle sorting
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
    const handleSearch = (value: string) => {
        onSearch(value);
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => handleSearch(event.currentTarget.value)}
            />
        </Search>
    );
}
