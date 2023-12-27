import React from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { AuthForm } from '../features/auth/components';
import { User } from '../models';
import { userApi } from '../api';

export function RegisterPage() {
    const handleRegisterFormSubmit = async (data: any) => {
        const newUser: Partial<User> = {
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        };
        console.log(newUser);
        try {
            await userApi.addUser(newUser);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <PublicHeader />
            <AuthForm onSubmit={handleRegisterFormSubmit} isSignIn={false} />
            <PublicFooter />
        </React.Fragment>
    );
}
