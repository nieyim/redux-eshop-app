import React from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { HomeHero, HomeValues, HomeCategories, HomeCTA, HomeSmokingHero } from '../features/home/components';

export function HomePage() {
    return (
        <React.Fragment>
            <PublicHeader />
            <HomeHero />
            <HomeValues />
            <HomeCategories />
            <HomeCTA />
            <HomeSmokingHero />
            <PublicFooter />
        </React.Fragment>
    );
}
