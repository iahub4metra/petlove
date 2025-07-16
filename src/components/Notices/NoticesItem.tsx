import { FaStar } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { Pet } from '../App/types';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getNoticeById } from '../../redux/notices/operations';
import {
    manageModalAttention,
    manageModalNotice,
} from '../../redux/uiState/slice';

export interface NoticesItemProps {
    pet: Pet;
}

export default function NoticesItem({ pet }: NoticesItemProps) {
    const dispatch: AppDispatch = useDispatch();

    const handleLearnMore = async () => {
        if (localStorage.getItem('token')) {
            await dispatch(getNoticeById(pet._id));
            dispatch(manageModalNotice(true));
        } else {
            dispatch(manageModalAttention(true));
        }
    };

    const petInfo = [
        {
            label: 'Name',
            value: pet.name.charAt(0).toUpperCase() + pet.name.slice(1),
        },
        { label: 'Birthday', value: pet.birthday?.split('-').join('.') },
        {
            label: 'Sex',
            value: pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1),
        },
        {
            label: 'Species',
            value: pet.species.charAt(0).toUpperCase() + pet.species.slice(1),
        },
        {
            label: 'Category',
            value: pet.category.charAt(0).toUpperCase() + pet.category.slice(1),
        },
    ];
    return (
        <div className="bg-white rounded-[16px] p-[24px] w-[335px] md:w-[342px] xl:w-[363px]">
            <img
                src={pet.imgURL}
                alt="Pet's image"
                className="w-[287px] md:w-[294px] h-[178px] xl:w-[315px] rounded-[16px] mb-[24px]"
            />
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#2B2B2A] text-[16px] font-bold leading-5 max-w-[210px] overflow-ellipsis line-clamp-1">
                        {pet.title}
                    </h4>
                    <span className="flex items-center gap-1">
                        <FaStar className="fill-[#FFC531] w-[16px] h-[16px]" />
                        <p className="text-[#2B2B2A] text-[14px] font-medium leading-[18px]">
                            {pet.popularity}
                        </p>
                    </span>
                </div>
                <ul className="flex items-center gap-3.5 mb-4">
                    {petInfo.map((block, index) => (
                        <li
                            key={index}
                            className="flex flex-col gap-0.5 items-start"
                        >
                            <span className="text-[10px] leading-3.5 font-medium tracking-[-0.2px] text-[#26262680]">
                                {block.label}
                            </span>
                            <span className="text-[#262626] text-[12px] font-medium leading-3.5 tracking-[-0.24px] line-clamp-1">
                                {block.value}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="line-clamp-2 text-[#2B2B2A] text-[14px] font-medium leading-[18px] tracking-[-0.28px] mb-4 h-[36px]">
                    {pet.comment}
                </p>
                <p className="mb-3 text-[#2B2B2A] text-16px] font-bold leading-5 text-left md:text-[18px] md:leading-6">
                    {pet.price ? `$${pet.price}` : 'Free'}
                </p>
                <div className="flex gap-2.5 items-center">
                    <button
                        type="button"
                        onClick={handleLearnMore}
                        className="bg-[#F6B83D] hover:scale-[1.01] hover:bg-[#F9B020] active:scale-[1.01] transition-all duration-500 text-white text-[14px] font-medium leading-[18px] tracking-[-0.42px] py-[14px] px-[80px] cursor-pointer rounded-[30px]"
                    >
                        Learn more
                    </button>
                    <button
                        type="button"
                        className="bg-[#FFF4DF] hover:bg-[#FBE7C1] rounded-full transition-colors duration-500 cursor-pointer w-[46px] md:w-[48px] h-[46px] md:h-[48px] p-[15px]"
                    >
                        {pet ? (
                            <CiHeart className="fill-[#F6B83D] w-[18px] h-[18px]" />
                        ) : (
                            <FaRegTrashAlt className="fill-[#F6B83D] w-[18px] h-[18px]" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
