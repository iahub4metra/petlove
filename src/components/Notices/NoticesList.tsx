import NoticesItem from './NoticesItem';
import type { Pet } from '../App/types';
import { useSelector } from 'react-redux';
import { selectNoticesStatus } from '../../redux/notices/selectors';
import { useEffect, useRef, useState } from 'react';
import ErrorBanner from '../Errors/ErrorBanner';

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
    const [openSnackbarByid, setOpenSnackbarByid] = useState<boolean>(false);
    const noticeByIdStatus = useSelector(selectNoticesStatus).noticeById;
    const prevStatusByid = useRef(noticeByIdStatus.status);

    useEffect(() => {
        if (
            prevStatusByid.current !== 'failed' &&
            noticeByIdStatus.status === 'failed'
        ) {
            setOpenSnackbarByid(true);
        }
        prevStatusByid.current = noticeByIdStatus.status;
    }, [noticeByIdStatus.status]);

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
            <ErrorBanner
                open={openSnackbarByid}
                onClose={() => setOpenSnackbarByid(false)}
                message={noticeByIdStatus.error?.message ?? null}
            />
        </>
    );
}
