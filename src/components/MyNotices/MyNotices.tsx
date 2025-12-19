import { useState } from 'react';
import NoticesList from '../Notices/NoticesList';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

export default function MyNotices() {
    const [activeTab, setActiveTab] = useState<'favourites' | 'viewed'>(
        'favourites',
    );
    const user = useSelector(selectUser);
    const noticesFavorites =
        user && 'noticesFavorites' in user ? user.noticesFavorites : [];
    const noticesViewed =
        user && 'noticesViewed' in user ? user.noticesViewed : [];
    return (
        <div className="xl:w-[664px]">
            <div className="flex gap-2.5 md:gap-2 mb-5 md:mb-9">
                <button
                    onClick={() => setActiveTab('favourites')}
                    className={`rounded-[30px] p-3 border-0 cursor-pointer text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px] transition-colors ${
                        activeTab === 'favourites'
                            ? 'bg-[#F6B83D] text-white'
                            : 'bg-white text-[#262626]'
                    }`}
                >
                    My favourite pets
                </button>
                <button
                    onClick={() => setActiveTab('viewed')}
                    className={`rounded-[30px] p-3 border-0 cursor-pointer text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px] transition-colors ${
                        activeTab === 'viewed'
                            ? 'bg-[#F6B83D] text-white'
                            : 'bg-white text-[#262626]'
                    }`}
                >
                    Viewed
                </button>
            </div>
            {activeTab === 'favourites' ? (
                noticesFavorites.length === 0 ? (
                    <div className="flex items-center justify-center">
                        <p className="text-[14px] leading-[18px] tracking-[-0.24px] text-[#262626] text-center md:max-w-[458px]">
                            Oops,{' '}
                            <span className="text-[#F6B83D]">
                                looks like there aren't any furries
                            </span>{' '}
                            on our adorable page yet. Do not worry! View your
                            pets on the "find your favorite pet" page and add
                            them to your favorites.
                        </p>
                    </div>
                ) : (
                    <div className="h-[928px] md:h-[864px] xl:h-[868px] overflow-y-scroll">
                        <NoticesList notices={noticesFavorites} favoriteList />
                    </div>
                )
            ) : (
                <div className="h-[928px] md:h-[864px] xl:h-[868px] overflow-y-scroll  relative custom-scrollbar">
                    <NoticesList notices={noticesViewed} viewedList />
                </div>
            )}
        </div>
    );
}
