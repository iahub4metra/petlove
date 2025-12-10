import { FaUserLarge } from 'react-icons/fa6';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { manageModalEditUser } from '../../redux/uiState/slice';
import { selectUser } from '../../redux/auth/selectors';

export default function UserBlock() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col items-center gap-2">
                <div className="w-[94px] h-[94px] flex justify-center items-center bg-[#FFF4DF] rounded-full">
                    <FaUserLarge className="w-[40px] h-[40px] fill-[#F6B83D]" />
                </div>
                <button
                    onClick={() => dispatch(manageModalEditUser(true))}
                    className="bg-transparent border-0 cursor-pointer hover:underline leading-4 text-[12px] font-medium tracking-[-0.24px] text-[#262626] text-center"
                >
                    Upload photo
                </button>
            </div>
            <h4 className="font-bold text-[16px] text-[#262626] leading-5 text-left">
                My information
            </h4>
            <div className="flex flex-col gap-[10px] mb-[40px]">
                <input
                    className="p-[12px] leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                    type="text"
                    value={user?.name}
                    disabled
                    placeholder="Name"
                />
                <input
                    className="p-[12px] leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                    type="text"
                    value={user?.email}
                    disabled
                    placeholder="Email"
                />
                <input
                    className="p-[12px] leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                    type="text"
                    value={user && 'phone' in user ? user.phone : ''}
                    disabled
                    placeholder="Phone Number"
                />
            </div>
        </div>
    );
}
