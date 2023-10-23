import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../app/hooks';
import { AuthForm, PublicFooter, PublicHeader } from '../components/layout';
import { authThunk } from '../features/auth/authThunk';
import { LoginPayload } from '../models';

export function LoginPage() {
    // const userInfo = useAppSelector(selectUserInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (userInfo) {
    //             navigate('/admin', { replace: true });
    //         }
    //     }, 1000);
    // }, [navigate, userInfo]);

    const handleLoginFormSubmit = (data: any) => {
        const loginPayload: LoginPayload = {
            username: data.username,
            password: data.password,
        };
        dispatch(authThunk(loginPayload)).then((data: any) => {
            if (data.payload.id != null) {
                toast.success('Login Success!', {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'dark',
                    hideProgressBar: true,
                });
                setTimeout(() => {
                    navigate('/admin');
                }, 1000);
            } else {
                toast.error('Invalid Credentials!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            }
        });
    };

    return (
        <React.Fragment>
            <PublicHeader />
            <AuthForm onSubmit={handleLoginFormSubmit} isSignIn={true} />
            <PublicFooter />
            <ToastContainer />
        </React.Fragment>
    );
}
