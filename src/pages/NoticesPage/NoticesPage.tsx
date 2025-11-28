import { useDispatch, useSelector } from 'react-redux';
import NoticesList from '../../components/Notices/NoticesList';
import PagesTitle from '../../components/PagesTitle/PagesTitle';
import type { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getAllNotices } from '../../redux/notices/operations';
import {
    selectFilters,
    selectLoading,
    selectPage,
} from '../../redux/notices/selectors';
import { selectTotlaPages } from '../../redux/notices/selectors';
import Pagination from '../../components/Pagination/Pagination';
import { setPage } from '../../redux/notices/slice';
import NoticesFilters from '../../components/Notices/NoticesFilters';

export default function NoticesPage() {
    const dispatch: AppDispatch = useDispatch();
    const page = useSelector(selectPage);
    const totalPages = useSelector(selectTotlaPages);
    const loading = useSelector(selectLoading);
    const filters = useSelector(selectFilters);

    useEffect(() => {
        dispatch(getAllNotices({ page, filters }));
    }, [page, dispatch, filters]);

    return (
        <section className="pb-[80px] pt-[26px] md:pt-[52px] xl:pt-[64px]">
            <div className="adaptive-container">
                <PagesTitle />
                <NoticesFilters />
                <NoticesList />
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    loading={loading}
                />
            </div>
        </section>
    );
}
