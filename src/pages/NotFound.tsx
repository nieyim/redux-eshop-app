import { Box, Container, Typography, Button, SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

export function NotFound() {
    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}
            >
                <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                mb: 3,
                                textAlign: 'center',
                            }}
                        >
                            <img
                                alt="Under development"
                                src="https://material-kit-react.devias.io/assets/errors/error-404.png"
                                style={{
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                    width: 400,
                                }}
                            />
                        </Box>
                        <Typography align="center" sx={{ mb: 3 }} variant="h3">
                            404: The page you are looking for isn’t here
                        </Typography>
                        <Typography align="center" color="text.secondary" variant="body1">
                            You either tried some shady route or you came here by mistake. Whichever it is, try using
                            the navigation
                        </Typography>
                        <Button
                            href="/home"
                            startIcon={
                                <SvgIcon fontSize="small">
                                    <ArrowBackIcon />
                                </SvgIcon>
                            }
                            sx={{ mt: 3 }}
                            variant="contained"
                            color="secondary"
                        >
                            Go back to Home Page
                        </Button>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}
