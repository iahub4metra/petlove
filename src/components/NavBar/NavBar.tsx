import { useContext } from 'react';
import { NavLink } from 'react-router';
import { PageContext } from '../Context/PageContext';

interface NavBarProps {
    isMobile?: boolean;
}

export default function NavBar({ isMobile = false }: NavBarProps) {
    const { isHome } = useContext(PageContext);

    const getStyles = () => {
        if (isMobile) {
            return isHome ? 'text-[#262626]' : 'text-white';
        }
        return isHome ? 'text-white' : 'text-[#262626]';
    };

    const getBorderStyles = (isActive: boolean) => {
        if (isMobile) {
            if (isHome) {
                return isActive ? 'border-[#F6B83D]' : 'border-[#26262626]';
            }
            return isActive ? 'border-[#fff]' : 'border-[#FFFFFF26]';
        }
        if (isHome) {
            return 'border-[#FFFFFF66] hover:border-[#FFFFFF80]';
        }
        return isActive
            ? 'border-[#F6B83D]'
            : 'border-[#26262626] hover:border-[#F6B83D]';
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) => {
        return ` ${getStyles()} block text-[16px] py-[15px] px-[20px] rounded-[30px] border-solid border-[1px] border-[#26262626] text-center transition-colors duration-500 active:scale-[0.98]  ${getBorderStyles(
            isActive,
        )}`;
    };
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
