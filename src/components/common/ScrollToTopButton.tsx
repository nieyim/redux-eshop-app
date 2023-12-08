import { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Tooltip } from '@mui/material';

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 100); // Adjust the threshold as needed
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Tooltip title="Scroll To Top">
            <IconButton
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    display: isVisible ? 'flex' : 'none',
                    backgroundColor: '#ff3366',
                    '&:hover': {
                        backgroundColor: '#ff3366',
                    },
                }}
            >
                <KeyboardArrowUpIcon sx={{ color: 'white' }} />
            </IconButton>
        </Tooltip>
    );
}
