import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNav, AdminSideBar } from '../components/layout';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH,
    },
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
});

export function AdminPage() {
    const [openNav, setOpenNav] = useState(false);

    return (
        <React.Fragment>
            <AdminNav onNavOpen={() => setOpenNav(true)} />
            <AdminSideBar onClose={() => setOpenNav(false)} open={openNav} />
            <LayoutRoot>
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </LayoutRoot>
        </React.Fragment>
    );
}
