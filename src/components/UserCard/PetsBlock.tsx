import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router';
import PetsList from './PetsList';

export default function PetsBlock() {
    return (
        <div className="mb-5">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-[16px] md:text-[18px] md:leading-6 leading-5 text-[#2B2B2A]">
                    My pets
                </h3>
                <Link
                    to="/add-pet"
                    className="rounded-[30px] bg-[#F6B83D] px-4 md:px-[19px] py-2.5 flex items-center gap-1 w-[103px] md:w-[118px] text-white text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px]"
                >
                    Add Pet{' '}
                    {<FaPlus className="fill-white w-[18px] h-[18px]" />}
                </Link>
            </div>
            <PetsList />
        </div>
    );
}
