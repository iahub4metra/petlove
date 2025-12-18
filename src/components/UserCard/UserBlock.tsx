import { FaUserLarge } from 'react-icons/fa6';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { manageModalEditUser } from '../../redux/uiState/slice';
import { selectUser } from '../../redux/auth/selectors';
import { Avatar } from '@mui/material';

export default function UserBlock() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    const hasAvatar = user && 'avatar' in user && !!user.avatar;
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col items-center gap-2">
                {hasAvatar ? (
                    <Avatar
                        alt={user?.name}
                        src={
                            user && 'avatar' in user && user.avatar
                                ? user.avatar
                                : undefined
                        }
                        sx={{
                            width: '94px',
                            height: '94px',
                            '@media screen and (min-width: 768px)': {
                                width: '110px',
                                height: '110px',
                            },
                        }}
                    />
                ) : (
                    <>
                        <div className="w-[94px] h-[94px] md:w-[110px] md:h-[110px] flex justify-center items-center bg-[#FFF4DF] rounded-full">
                            <FaUserLarge className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] fill-[#F6B83D]" />
                        </div>
                        <button
                            onClick={() => dispatch(manageModalEditUser(true))}
                            className="bg-transparent border-0 cursor-pointer hover:underline leading-4 text-[12px] font-medium tracking-[-0.24px] text-[#262626] text-center"
                        >
                            Upload photo
                        </button>
                    </>
                )}
            </div>
            <h4 className="font-bold text-[16px] text-[#262626] leading-5 text-left">
                My information
            </h4>
            <div className="flex flex-col gap-[10px] mb-[40px] md:flex-row md:flex-wrap md:gap-3.5 xl:flex-col xl:flex-nowrap">
                <input
                    className="p-[12px] md:p-4 md:w-[305px] xl:w-full leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                    type="text"
                    value={user?.name}
                    disabled
                    placeholder="Name"
                    name="name"
                />
                <input
                    className="p-[12px] md:p-4 md:w-[305px] xl:w-full leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                    type="text"
                    value={user?.email}
                    disabled
                    placeholder="Email"
                    name="email"
                />
                <input
                    className="p-[12px] md:p-4 md:w-[305px] xl:w-full leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                    type="text"
                    value={user && 'phone' in user ? user.phone : ''}
                    disabled
                    placeholder="Phone Number"
                    name="phone"
                />
            </div>
        </div>
    );
}
