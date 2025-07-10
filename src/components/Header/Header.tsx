import { Link } from 'react-router';
import { FaHeart } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';
import NavBar from '../NavBar/NavBar';
import AuthNav from '../AuthNav/AuthNav';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../../redux/uiState/slice';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';
import { selectUser } from '../../redux/auth/selectors';
import { useContext } from 'react';
import { PageContext } from '../Context/PageContext';
import { useMediaQuery } from '@mui/material';

export default function Header() {
    const dispatch: AppDispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width: 767px)');
    const user = useSelector(selectUser);
    const { isHome } = useContext(PageContext);

    return (
        <header className={`${isHome ? ' ' : 'py-7 md:py-8'} mx-auto `}>
            <div
                className={`flex items-center justify-between ${
                    !isHome && 'adaptive-container'
                } `}
            >
                <Link
                    to="/"
                    className={`${
                        isHome ? 'text-white' : 'text-[#262626]'
                    } flex items-center text-[20px] font-bold  md:text-[28px]`}
                >
                    petl
                    <FaHeart
                        className={`${
                            isHome ? 'fill-white' : 'fill-[#F6B83D] '
                        } w-[17px] h-[17px] md:w-[23px] md:h-[23px] self-end`}
                    />
                    ove
                </Link>
                <NavBar />
                <div className="flex items-center gap-4">
                    {!user && <AuthNav />}
                    {user && !isMobile && <LogOutBtn />}
                    {user && <UserBar />}
                    <IoMenu
                        className={`${
                            isHome ? 'stroke-white' : 'stroke-[#262626]'
                        } min-xl:hidden w-[32px] h-[32px] md:w-[36px] md:h-[36px] cursor-pointer hover:scale-[1.4] hover:rotate-180 duration-500 transition-transform`}
                        onClick={() => dispatch(openMenu())}
                    />
                </div>
            </div>
        </header>
    );
}
