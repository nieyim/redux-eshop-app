import React from 'react';
import { HomePageHeader, ProductCategories, ProductHero, ProductValues } from '../components/layout';

export function HomePage() {
    return (
        <React.Fragment>
            <HomePageHeader />
            <ProductHero />
            <ProductValues />
            <ProductCategories />
        </React.Fragment>
    );
}
