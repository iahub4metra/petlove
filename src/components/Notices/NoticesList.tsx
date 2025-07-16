import { useSelector } from 'react-redux';
import { selectNotices } from '../../redux/notices/selectors';
import NoticesItem from './NoticesItem';

export default function NoticesList() {
    const notices = useSelector(selectNotices);

    return (
        <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
            {notices.map((pet) => (
                <li key={pet._id}>
                    <NoticesItem pet={pet} />
                </li>
            ))}
        </ul>
    );
}
