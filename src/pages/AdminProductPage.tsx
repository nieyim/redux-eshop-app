import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export function AdminProductPage() {
    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    backgroundColor: '#fcfcfc',
                }}
            >
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
        </React.Fragment>
    );
}
