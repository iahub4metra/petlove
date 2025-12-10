import { FaUserLarge } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { useContext } from 'react';
import { PageContext } from '../Context/PageContext';
import { Link } from 'react-router';

export default function UserBar() {
    const user = useSelector(selectUser);
    const { isHome } = useContext(PageContext);

    return (
        <Link
            to="/profile"
            className="flex items-center gap-2 cursor-pointer hover:scale-[105%] transition-transform"
        >
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#FFF4DF]">
                <FaUserLarge className="fill-[#F6B83D] w-[20px] h-[20px]" />
            </div>
            <h4
                className={`${
                    isHome ? 'text-white' : 'text-[#262626]'
                } hidden md:inline font-bold text-[20px] leading-5`}
            >
                {user?.name}
            </h4>
        </Link>
    );
}
