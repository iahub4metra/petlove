import PagesTitle from '../../components/PagesTitle/PagesTitle';
import { useEffect } from 'react';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../redux/news/operations';
import NewsList from '../../components/News/NewsList';
import {
    selectKeyword,
    selectNewsLoading,
    selectPage,
    selectTotalPages,
} from '../../redux/news/selectors';
import Pagination from '../../components/Pagination/Pagination';
import { setKeyword, setPage } from '../../redux/news/slice';
import SearchField from '../../components/SearchField/SearchField';

export default function NewsPage() {
    const dispatch: AppDispatch = useDispatch();
    const page = useSelector(selectPage);
    const keyword = useSelector(selectKeyword);
    const totalPages = useSelector(selectTotalPages);
    const loading = useSelector(selectNewsLoading);

    useEffect(() => {
        dispatch(getNews({ limit: 6, page: page, keyword: keyword }));
    }, [page, dispatch, keyword]);

    return (
        <section className="pb-[80px] pt-[26px] md:pt-[52px] xl:pt-[64px]">
            <div className="adaptive-container">
                <div className="flex flex-wrap items-start md:items-center md:flex-nowrap md:justify-between mb-[24px] md:mb-[44px] xl:mb-[60px]">
                    <PagesTitle />
                    <SearchField
                        action={setKeyword}
                        asForm
                        actionClear={setKeyword('')}
                    />
                </div>

                <NewsList />
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
