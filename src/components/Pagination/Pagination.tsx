import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { getVisiblePages } from '../../utils/getVisiblePages';

const btnClass =
    ' border-[1px] border-solid w-[40px] md:w-[44px] h-[40px] md:h-[44px] flex justify-center items-center rounded-full active:scale-[0.95] disabled:active:scale-[1]';

export interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: ActionCreatorWithPayload<number>;
    loading: boolean;
}

export default function Pagination({
    page,
    totalPages,
    setPage,
    loading,
}: PaginationProps) {
    const dispatch: AppDispatch = useDispatch();

    const isTablet = useMediaQuery('(min-width: 768px)');

    const visiblePages = getVisiblePages(page, totalPages, isTablet);

    const handleToFirst = () => {
        dispatch(setPage(1));
    };

    const handleToLast = () => {
        if (totalPages) {
            dispatch(setPage(totalPages));
        }
    };

    const handleNextPage = () => {
        dispatch(setPage(page + 1));
    };

    const handlePrevPage = () => {
        dispatch(setPage(page - 1));
    };

    return (
        <div
            className={`${
                loading ? 'pointer-events-none' : 'pointer-events-auto' // prevent double click
            } flex justify-center mt-[44px] md:mt-[60px]`}
        >
            <button
                className={`${btnClass} mr-[6px] ${
                    page === 1
                        ? 'border-[#2626260D] cursor-not-allowed'
                        : 'border-[#26262633] cursor-pointer'
                }`}
                disabled={page === 1}
                onClick={handleToFirst}
            >
                <MdOutlineKeyboardDoubleArrowLeft className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
            </button>
            <button
                className={`${btnClass} ${
                    page === 1
                        ? 'border-[#2626260D] cursor-not-allowed'
                        : 'border-[#26262633] cursor-pointer'
                }`}
                disabled={page === 1}
                onClick={handlePrevPage}
            >
                <MdOutlineKeyboardArrowLeft className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
            </button>
            <ul className="gap-2.5 flex mx-[11px]">
                {visiblePages.map((p) => (
                    <li key={p}>
                        <button
                            className={`${
                                page == p
                                    ? 'bg-[#F6B83D] border-transparent text-white'
                                    : 'bg-transparent border-[#2626260D]'
                            } font-bold cursor-pointer text-[14px] leading-[18px] md:text-[18px] md:leading-[22px] border-[1px] border-solid w-[40px] md:w-[44px] h-[40px] md:h-[44px] flex justify-center items-center rounded-full`}
                            onClick={() => {
                                if (p !== page) {
                                    dispatch(setPage(p));
                                }
                            }}
                        >
                            {p}
                        </button>
                    </li>
                ))}
                {totalPages > (isTablet ? 3 : 2) && (
                    <li className="border-[#2626260D] border-[1px] border-solid w-[40px] md:w-[44px] h-[40px] md:h-[44px] flex justify-center items-center rounded-full">
                        ...
                    </li>
                )}
            </ul>

            <button
                className={`${btnClass} ${
                    page === totalPages
                        ? 'border-[#2626260D] cursor-not-allowed'
                        : 'border-[#26262633] cursor-pointer'
                }`}
                disabled={page == totalPages}
                onClick={handleNextPage}
            >
                <MdOutlineKeyboardArrowRight className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
            </button>
            <button
                className={`${btnClass} ml-[6px] ${
                    page === totalPages
                        ? 'border-[#2626260D] cursor-not-allowed'
                        : 'border-[#26262633] cursor-pointer'
                }`}
                disabled={page == totalPages}
                onClick={handleToLast}
            >
                <MdOutlineKeyboardDoubleArrowRight className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
            </button>
        </div>
    );
}
