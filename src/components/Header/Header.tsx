import { Link } from 'react-router';
import { FaHeart } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';
import NavBar from '../NavBar/NavBar';
import AuthNav from '../AuthNav/AuthNav';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { openMenu } from '../../redux/mobileMenu/slice';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';

export default function Header() {
    const dispatch: AppDispatch = useDispatch();

    return (
        <header className="py-8">
            <div className="flex justify-between items-center adaptive-container">
                <Link
                    to="/"
                    className="flex items-center text-[20px] font-bold text-[#262626] md:text-[28px]"
                >
                    petl
                    <FaHeart className="fill-[#F6B83D] w-[17px] h-[17px] md:w-[23px] md:h-[23px]" />
                    ove
                </Link>
                <NavBar />
                <div className="flex items-center gap-4">
                    {!dispatch && <AuthNav />}
                    <LogOutBtn />
                    <UserBar />
                    <IoMenu
                        className="min-xl:hidden w-[32px] h-[32px] md:w-[36px] md:h-[36px] cursor-pointer"
                        onClick={() => dispatch(openMenu())}
                    />
                </div>
            </div>
        </header>
    );
}
