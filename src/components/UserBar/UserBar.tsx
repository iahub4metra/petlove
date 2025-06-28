import { FaUserLarge } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

export default function UserBar() {
    const user = useSelector(selectUser);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#FFF4DF]">
                <FaUserLarge className="fill-[#F6B83D] w-[20px] h-[20px]" />
            </div>
            <h4 className="hidden md:inline text-[#262626] font-bold text-[20px] leading-5">
                {user?.name}
            </h4>
        </div>
    );
}
