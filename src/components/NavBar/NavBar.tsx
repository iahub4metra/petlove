import { NavLink } from 'react-router';

interface NavBarProps {
    isMobile?: boolean;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `text-[#262626] block text-[16px] py-[15px] px-[20px] rounded-[30px] border-solid border-[1px] border-[#26262626] text-center transition-colors duration-300 active:scale-[0.98] hover:border-[#F6B83D] ${
        isActive ? 'border-[#F6B83D]' : 'border-[#26262626]'
    }`;
};

export default function NavBar({ isMobile = false }: NavBarProps) {
    return (
        <>
            <ul
                className={`flex gap-2.5 text-center ${
                    isMobile ? 'flex-col' : 'max-xl:hidden'
                }`}
            >
                <li className="max-h-[50px] h-[50px]">
                    <NavLink to="/news" className={navLinkClass}>
                        News
                    </NavLink>
                </li>
                <li className="max-h-[50px] h-[50px]">
                    <NavLink to="/notices" className={navLinkClass}>
                        Find pet
                    </NavLink>
                </li>
                <li className="max-h-[50px] h-[50px]">
                    <NavLink to="/friends" className={navLinkClass}>
                        Our friends
                    </NavLink>
                </li>
            </ul>
        </>
    );
}
