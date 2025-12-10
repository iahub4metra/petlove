import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../components/UserCard/UserCard';
import type { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getCurrentUserFull } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';

export default function ProfilePage() {
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector(selectUser)?.token;

    useEffect(() => {
        if (token) dispatch(getCurrentUserFull(token));
    }, [dispatch, token]);

    return (
        <div className="adaptive-container">
            <UserCard />
        </div>
    );
}
