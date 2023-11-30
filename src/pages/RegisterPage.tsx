import React from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { AuthForm } from '../features/auth/components';

export function RegisterPage() {
    const handleRegisterFormSubmit = (data: any) => {
        ///
    };

    return (
        <React.Fragment>
            <PublicHeader />
            <AuthForm onSubmit={handleRegisterFormSubmit} isSignIn={false} />
            <PublicFooter />
        </React.Fragment>
    );
}
