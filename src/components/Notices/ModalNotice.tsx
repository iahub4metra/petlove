import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalNotice } from '../../redux/uiState/selectors';
import { selectSelectedPet } from '../../redux/notices/selectors';
import type { AppDispatch } from '../../redux/store';
import { manageModalNotice } from '../../redux/uiState/slice';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { selectUser } from '../../redux/auth/selectors';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
    addNoticeToFavourite,
    removeNoticeFromFavourite,
} from '../../redux/notices/operations';

export default function ModalNotice() {
    const isOpen = useSelector(selectModalNotice);
    const pet = useSelector(selectSelectedPet);
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    const userID = user && '_id' in user ? user._id : undefined;
    const noticesFavorites =
        user && 'noticesFavorites' in user ? user.noticesFavorites : undefined;
    const petInfo = pet && [
        {
            label: 'Name',
            value: pet?.name.charAt(0).toUpperCase() + pet.name.slice(1),
        },
        { label: 'Birthday', value: pet?.birthday?.split('-').join('.') },
        {
            label: 'Sex',
            value: pet?.sex.charAt(0).toUpperCase() + pet.sex.slice(1),
        },
        {
            label: 'Species',
            value: pet?.species.charAt(0).toUpperCase() + pet.species.slice(1),
        },
    ];

    return (
        <Modal
            open={isOpen}
            onClose={() => dispatch(manageModalNotice(false))}
            sx={{
                '& .MuiModal-backdrop': {
                    bgcolor: '#2626264D',
                },
            }}
        >
            <div className="relative top-2/4 left-3/6 translate-[-50%] bg-white w-[335px] md:w-[473px] flex flex-col items-center rounded-[30px] py-[40px] px-[28px]">
                <button
                    type="button"
                    onClick={() => dispatch(manageModalNotice(false))}
                    className="absolute top-[20px] right-[20px] cursor-pointer hover:scale-[1.1] hover:rotate-180 transition-transform duration-300 active:scale-[1.1] active:rotate-180"
                >
                    <IoClose className="w-[24px] h-[24px]" />
                </button>
                <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
                    <img src={pet?.imgURL} className="rounded-full " />
                    <p className="absolute bg-[#FFF4DF] text-[#F6B83D] text-[12px] leading-4 font-medium tracking-[-0.24px] py-2 px-3.5 top-0 left-[-2px] rounded-[30px]">
                        {pet
                            ? pet?.category.charAt(0).toUpperCase() +
                              pet?.category.slice(1)
                            : ''}
                    </p>
                </div>
                <h4 className="text-[#2B2B2A] text-[16px] font-bold leading-5 max-w-[210px] overflow-ellipsis line-clamp-1 mb-2.5">
                    {pet?.title}
                </h4>
                {pet?.popularity !== undefined && (
                    <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const maxPopularity = 12000;
                            const normalized = Math.round(
                                (pet.popularity / maxPopularity) * 5,
                            );
                            return i < normalized ? (
                                <FaStar
                                    key={i}
                                    className="text-[#FFC531] w-[16px] h-[16px]"
                                />
                            ) : (
                                <FaStar
                                    key={i}
                                    className="text-[#F4F4F4] w-[16px] h-[16px]"
                                />
                            );
                        })}
                        <p className="text-[#2B2B2A] text-[14px] font-medium leading-5">
                            {pet.popularity}
                        </p>
                    </div>
                )}
                <ul className="flex items-center gap-[27px] mb-4">
                    {petInfo?.map((block, index) => (
                        <li
                            key={index}
                            className="flex flex-col gap-0.5 items-start"
                        >
                            <span className="text-[10px] leading-3.5 font-medium tracking-[-0.2px] text-[#26262680] line-clamp-1">
                                {block.label}
                            </span>
                            <span className="text-[#262626] text-[12px] font-medium leading-3.5 tracking-[-0.24px]">
                                {block.value}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="line-clamp-2 text-[#2B2B2A] text-[14px] font-medium leading-[18px] tracking-[-0.28px] mb-8">
                    {pet?.comment}
                </p>
                <p className="text-[#2B2B2A] text-[16px] font-black leading-5 mb-5">
                    {pet?.price ? `$${pet?.price}` : 'Free'}
                </p>
                <div className="flex gap-2.5 items-center">
                    {!noticesFavorites?.find(
                        (notice) => notice._id === pet?._id,
                    ) ? (
                        <button
                            onClick={() =>
                                dispatch(
                                    addNoticeToFavourite({
                                        notice: pet!,
                                        userID: userID,
                                    }),
                                )
                            }
                            className="flex py-[12px] px-[31px] bg-[#F6B83D] rounded-[30px] text-white text-[16px] font-medium leading-5 tracking-[-0.48px] gap-2 items-center cursor-pointer "
                        >
                            Add to
                            <CiHeart className="fill-white w-[18px] h-[18px]" />
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                dispatch(removeNoticeFromFavourite(pet!))
                            }
                            className="flex py-[12px] px-[31px] bg-[#F6B83D] rounded-[30px] text-white text-[16px] font-medium leading-5 tracking-[-0.48px] gap-2 items-center cursor-pointer "
                        >
                            Remove
                            <FaRegTrashAlt className="fill-white w-[18px] h-[18px]" />
                        </button>
                    )}

                    <a
                        href={`mailto:${pet?.user.email}`}
                        className="rounded-[30px] bg-[#FFF4DF] text-[#F6B83D] text-[16px] font-medium leading-5 tracking-[-0.48px] py-[12px] px-[37px]"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </Modal>
    );
}
