import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useDispatch } from 'react-redux';
import { getCurrentUserFull } from '../../redux/auth/operations';
import type { AppDispatch } from '../../redux/store';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useLocation } from 'react-router';
import ModalApproveAction from '../LogOut/ModalApproveAction';
import ModalNotice from '../Notices/ModalNotice';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalEditUser from '../ModalEditUser/ModalEditUser';

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            dispatch(getCurrentUserFull(token));
        }
    }, [dispatch, token]);

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
            <ModalApproveAction />
            <ModalNotice />
            <ModalAttention />
            <ModalEditUser />
        </div>
    );
}
