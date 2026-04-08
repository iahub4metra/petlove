import NoticesItem from './NoticesItem';
import type { Pet } from '../App/types';
import { useSelector } from 'react-redux';
import { selectNoticesStatus } from '../../redux/notices/selectors';
import ErrorBanner from '../Errors/ErrorBanner';
import { useErrorBanner } from '../../hooks/useErrorBanner';
import { selectAuthOperations } from '../../redux/auth/selectors';

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
    const noticeByIdStatus = useSelector(selectNoticesStatus).noticeById;
    const noticeOperationsStatus = useSelector(selectAuthOperations);
    const noticeByIdError = useErrorBanner(
        noticeByIdStatus.status,
        noticeByIdStatus.error ?? null,
    );
    const noticeAddFavError = useErrorBanner(
        noticeOperationsStatus.addFav.status,
        noticeOperationsStatus.addFav.error ?? null,
    );
    const noticeRemoveError = useErrorBanner(
        noticeOperationsStatus.removeFav.status,
        noticeOperationsStatus.removeFav.error ?? null,
    );

    return (
        <>
            <ul
                className={`flex flex-col gap-5 md:flex-row md:flex-wrap ${
                    viewedList
                        ? 'xl:gap-y-6 md:gap-x-2.5 '
                        : favoriteList
                          ? 'xl:gap-y-6 md:gap-x-2.5'
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
            <ErrorBanner {...noticeByIdError} />
            <ErrorBanner {...noticeAddFavError} />
            <ErrorBanner {...noticeRemoveError} />
        </>
    );
}
