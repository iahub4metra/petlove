import { Avatar } from '@mui/material';
import type { UserPets } from '../App/types';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { removePet } from '../../redux/auth/operations';

export interface PetsItemProps {
    pet: UserPets;
}

export default function PetsItem({ pet }: PetsItemProps) {
    const dispatch: AppDispatch = useDispatch();

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
    ];

    return (
        <div className="rounded-[30px] border-[#26262615] border-[1px] p-[15px] flex gap-3.5 relative">
            <Avatar
                src={pet.imgURL}
                sx={{
                    width: '66px',
                    height: '66px',
                }}
            />
            <div>
                <h3 className="font-bold text-[14px] leading-[18px] text-[#2B2B2A] overflow-ellipsis overflow-hidden max-w-[145px]">
                    {pet.title}
                </h3>
                <ul className="flex items-center gap-2.5 min-[375px]:gap-3.5 mt-2 flex-wrap">
                    {petInfo.map((block, index) => (
                        <li
                            key={index}
                            className="flex flex-col gap-0.5 items-start"
                        >
                            <span className="text-[10px] leading-3.5 font-medium tracking-[-0.24px] text-[#26262680]">
                                {block.label}
                            </span>
                            <span className="text-[#262626] text-[12px] font-medium leading-3.5 tracking-[-0.24px] line-clamp-1">
                                {block.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="rounded-full p-[7px] bg-[#FFF4DF] absolute top-[12px] right-[12px]">
                <FaRegTrashAlt
                    className="fill-[#F6B83D] w-[18px] h-[18px]"
                    onClick={() => dispatch(removePet(pet._id))}
                />
            </div>
        </div>
    );
}
