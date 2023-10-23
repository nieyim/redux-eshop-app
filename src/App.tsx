import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { Button, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
// import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardPage, HomePage, LoginPage, ProductPage, RegisterPage } from './pages';
import { AdminPage } from './pages/AdminPage';
import { PrivateRoute } from './utils/PrivateRoute';
import theme from './utils/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route path="/admin/dashboard" element={<DashboardPage />} />
                        <Route path="/admin/products" element={<ProductPage />}></Route>
                    </Route>
                </Route>
                {/* <Route path="/*" element={<NotFound />} />  */}
            </Routes>
            {/* <Button
                sx={{ position: 'fixed', bottom: 5, right: 5 }}
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
                <DarkModeIcon />
            </Button> */}
        </ThemeProvider>
    );
}

export default App;