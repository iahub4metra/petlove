import { useSelector } from 'react-redux';
import { selectNews, selectNewsOperations } from '../../redux/news/selectors';
import NewsItem from './NewsItem';
import NewsListSkeleton from './NewsListSkeleton';
import ErrorState from '../Errors/ErrorState';

export default function NewsList() {
    const news = useSelector(selectNews);
    const operations = useSelector(selectNewsOperations);

    if (operations.news.status === 'succeeded') {
        return <NewsListSkeleton />;
    }

    if (operations.news.status === 'failed') {
        return <ErrorState error={operations.news.error} />;
    }

    return (
        <ul className="flex flex-col items-center gap-6 md:flex-wrap md:flex-row md:gap-x-6 md:gap-y-8 xl:gap-x-[35px] xl:gap-y-[40px]">
            {news.map((item) => {
                return (
                    <li
                        key={item._id}
                        className="md:mb-7 max-w-[335px] md:max-w-[340px] md:h-[448px] xl:max-w-[360.5px]"
                    >
                        <NewsItem item={item} />
                    </li>
                );
            })}
        </ul>
    );
}
