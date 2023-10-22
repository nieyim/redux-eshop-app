import React from 'react';
import {
    ProductCTA,
    ProductCategories,
    ProductHero,
    ProductSmokingHero,
    ProductValues,
    PublicFooter,
    PublicHeader,
} from '../components/layout';

export function HomePage() {
    return (
        <React.Fragment>
            <PublicHeader />
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductCTA />
            <ProductSmokingHero />
            <PublicFooter />
        </React.Fragment>
    );
}
