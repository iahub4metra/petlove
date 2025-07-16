import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { selectIsOpen } from '../../redux/uiState/selectors';
import NavBar from '../NavBar/NavBar';
import type { AppDispatch } from '../../redux/store';
import { closeMenu } from '../../redux/uiState/slice';
import AuthNav from '../AuthNav/AuthNav';
import { useLocation } from 'react-router';
import LogOutBtn from '../LogOut/LogOutBtn';
import { selectUser } from '../../redux/auth/selectors';

export default function MobileMenu() {
    const isOpen = useSelector(selectIsOpen);
    const dispatch: AppDispatch = useDispatch();

    const location = useLocation().pathname === '/';
    const user = useSelector(selectUser);
    return (
        <>
            <div
                className={`fixed inset-0 z-40  transition-opacity duration-300 transitionFunction ${
                    isOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => dispatch(closeMenu())}
            />

            <div
                className={`w-[218px] md:w-[374px] fixed top-0 right-0 h-full  z-50 transition-all duration-500 transitionFunction ${
                    location ? 'bg-white' : 'bg-[#F6B83D]'
                } ${
                    isOpen
                        ? 'translate-x-0 opacity-100 pointer-events-auto'
                        : 'translate-x-full opacity-0 pointer-events-none'
                }`}
            >
                <div
                    className={` h-full flex flex-col justify-between items-center pb-[40px] px-[20px] md:px-[49px] pt-[39px]`}
                >
                    <MdClose
                        className={`${
                            location ? 'fill-[#262626]' : 'fill-white'
                        } w-[32px] h-[32px] cursor-pointer self-end transition-transform duration-500 hover:rotate-180`}
                        onClick={() => dispatch(closeMenu())}
                    />
                    <NavBar isMobile />
                    {user ? <LogOutBtn isMobile /> : <AuthNav isMobile />}
                </div>
            </div>
        </>
    );
}
