import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { signOut } from '../../redux/auth/operations';

interface LogOutBtnProps {
    isMobile?: boolean;
}

export default function LogOutBtn({ isMobile = false }: LogOutBtnProps) {
    const dispatch: AppDispatch = useDispatch();
    const token = localStorage.getItem('token');

    return (
        <>
            <button
                className={`${
                    isMobile ? 'w-full px-[59px]' : 'w-auto  px-[60px]'
                } uppercase block py-[12px] md:py-[15px] md:px-[34px] text-[#F6B83D] bg-[#FFF4DF] text-[14px] leading-[18px] rounded-[30px] font-bold cursor-pointer hover:bg-[#FBE7C1] transition-all duration-500 hover:scale-[1.05] active:scale-[1.1]`}
                onClick={() => dispatch(signOut(token))}
            >
                Log out
            </button>
        </>
    );
}
