import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { signOut } from '../../redux/auth/operations';

export default function LogOutBtn() {
    const dispatch: AppDispatch = useDispatch();
    const token = localStorage.getItem('token');

    return (
        <>
            <button
                className={`uppercase block py-[12px] px-[60px] md:py-[15px] md:px-[35px] text-[#F6B83D] bg-[#FFF4DF] text-[14px] leading-[18px] rounded-[30px] font-bold`}
                onClick={() => dispatch(signOut(token))}
            >
                Log out
            </button>
        </>
    );
}
