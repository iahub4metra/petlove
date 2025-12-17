import NoticesItem from './NoticesItem';
import type { Pet } from '../App/types';

interface NoticesListProps {
    notices: Pet[];
    viewedList?: boolean;
}

export default function NoticesList({ notices, viewedList }: NoticesListProps) {
    const viewed = viewedList;
    return (
        <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
            {notices.map((pet) => (
                <li key={pet._id}>
                    <NoticesItem pet={pet} viewed={viewed} />
                </li>
            ))}
        </ul>
    );
}
