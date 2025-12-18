import NoticesItem from './NoticesItem';
import type { Pet } from '../App/types';

interface NoticesListProps {
    notices: Pet[];
    viewedList?: boolean;
    favoriteList?: boolean;
}

export default function NoticesList({
    notices,
    viewedList,
    favoriteList,
}: NoticesListProps) {
    return (
        <ul
            className={`flex flex-col gap-5 md:flex-row md:flex-wrap ${
                viewedList
                    ? 'xl:gap-6'
                    : favoriteList
                    ? 'xl:gap-6'
                    : 'xl:gap-x-[31px] xl:gap-y-10'
            }`}
        >
            {notices.map((pet) => (
                <li key={pet._id}>
                    <NoticesItem
                        pet={pet}
                        viewed={viewedList}
                        favourite={favoriteList}
                    />
                </li>
            ))}
        </ul>
    );
}
