import { useEffect } from 'react';
import PagesTitle from '../../components/PagesTitle/PagesTitle';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getFriends } from '../../redux/friends/operations';
import FriendsList from '../../components/Friends/FriendsList';

export default function OurFriendsPage() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    return (
        <section className="pb-[80px] pt-[26px] md:pt-[52px] xl:pt-[64px]">
            <div className="adaptive-container">
                <PagesTitle />
                <FriendsList />
            </div>
        </section>
    );
}
