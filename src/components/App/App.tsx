import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../redux/auth/operations';
import type { AppDispatch } from '../../redux/store';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useLocation } from 'react-router';

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getCurrentUser(token));
        }
    });

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [location.pathname]);

    return (
        <div>
            <Layout />
            <MobileMenu />
            {isLoading && <LoadingScreen />}
        </div>
    );
}
