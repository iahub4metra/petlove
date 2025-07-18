import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { PageContext } from '../Context/PageContext';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { manageModalAttention } from '../../redux/uiState/slice';

interface AuthNavProps {
    isMobile?: boolean;
    isModal?: boolean;
}

export default function AuthNav({
    isMobile = false,
    isModal = false,
}: AuthNavProps) {
    const { isHome } = useContext(PageContext);
    const isEffectiveHome = isMobile ? !isHome : isHome;
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleNavigate = (path: string) => {
        if (isModal) dispatch(manageModalAttention(false));
        navigate(path);
    };

    return (
        <>
            <ul
                className={`flex gap-2 text-center ${
                    isMobile
                        ? 'flex-col md:flex-row w-full'
                        : isModal
                        ? 'flex'
                        : 'hidden md:flex'
                }`}
            >
                <li>
                    <button
                        onClick={() => handleNavigate('/login')}
                        className={`${
                            isEffectiveHome
                                ? 'border-[#FFFFFF66] border hover:bg-[#FFF4DF] hover:text-[#F6B83D]'
                                : 'border-0 hover:bg-[#F9B020] '
                        } bg-[#F6B83D] block tracking-[-0.48px] text-white uppercase py-[15px] cursor-pointer px-[34px] rounded-[30px] leading-5 font-bold transition-colors duration-500`}
                    >
                        Log in
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleNavigate('/register')}
                        className="bg-[#FFF4DF] block text-[#F6B83D] tracking-[-0.48px] cursor-pointer uppercase py-[15px] px-[20px] rounded-[30px] leading-5 font-bold hover:bg-[#FBE7C1] transition-colors duration-500"
                    >
                        Registration
                    </button>
                </li>
            </ul>
        </>
    );
}
