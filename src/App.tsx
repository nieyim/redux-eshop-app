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
import { HomePage } from './pages';
import theme from './utils/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                {/* <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}></Route>
                <Route path="/*" element={<NotFound />} /> */}
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
