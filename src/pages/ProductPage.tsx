import { Box, Container, Stack, Typography, Button, SvgIcon } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export function ProductPage() {
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
