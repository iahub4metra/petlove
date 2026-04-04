import { useSelector } from 'react-redux';
import {
    selectFriends,
    selectFriendsOperations,
} from '../../redux/friends/selectors';
import FriendsItem from './FriendsItem';
import FriendsListSkeleton from './FriendsListSkeleton';
import ErrorState from '../Errors/ErrorState';

export default function FriendsList() {
    const friends = useSelector(selectFriends);
    const operations = useSelector(selectFriendsOperations);

    if (operations.friends.status === 'loading') {
        return <FriendsListSkeleton />;
    }

    if (operations.friends.status === 'failed') {
        return <ErrorState error={operations.friends.error} />;
    }

    return (
        <ul className="flex flex-col gap-5 md:flex-wrap md:flex-row xl:gap-y-7 xl:gap-x-5">
            {friends.map((friend) => (
                <li
                    key={friend._id}
                    className="relative rounded-[15px] bg-white w-[335px] md:w-[342px] xl:w-[370px] flex gap-4 justify-center items-center py-[40px] px-[20px]"
                >
                    <FriendsItem friend={friend} />
                </li>
            ))}
        </ul>
    );
}
