import React from 'react';
import { AuthForm, PublicFooter, PublicHeader } from '../components/layout';

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
