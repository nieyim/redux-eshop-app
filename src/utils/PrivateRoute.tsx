import { Navigate, Outlet, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
