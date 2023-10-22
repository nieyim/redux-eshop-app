import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

export function AdminPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/login');
    };

    return <Button onClick={handleLogOut}>Log out</Button>;
}
