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
import {
    AdminProductPage,
    BlogDetail,
    BlogPage,
    DashboardPage,
    HomePage,
    LoginPage,
    NotFound,
    ProductDetailPage,
    ProductPage,
    RegisterPage,
} from './pages';
import { AdminPage } from './pages/AdminPage';
import { PrivateRoute } from './utils/PrivateRoute';
import theme from './utils/theme';
import { AdminProductList, AdminAddEditProduct } from './features/product/components';
import { ScrollToTopButton } from './components/common';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:productID" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/blogs/:blogID" element={<BlogDetail />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route path="/admin/dashboard" element={<DashboardPage />} />
                        <Route path="/admin/products" element={<AdminProductPage />}>
                            <Route path="/admin/products" element={<AdminProductList />} />
                            <Route path="/admin/products/add" element={<AdminAddEditProduct />} />
                            <Route path="/admin/products/:productID" element={<AdminAddEditProduct />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ScrollToTopButton />
        </ThemeProvider>
    );
}

export default App;
