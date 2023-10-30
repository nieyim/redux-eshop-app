import React from 'react';
import { BlogHightlight, PublicFooter, PublicHeader } from '../components/layout';

export function BlogPage() {
    return (
        <React.Fragment>
            <PublicHeader />
            <BlogHightlight />
            <PublicFooter />
        </React.Fragment>
    );
}
