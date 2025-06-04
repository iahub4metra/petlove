import { NavLink } from 'react-router';

interface NavBarProps {
    isMobile?: boolean;
}

export default function NavBar({ isMobile = false }: NavBarProps) {
    return (
        <>
            <ul
                className={`flex gap-2.5 text-center ${
                    isMobile ? 'flex-col' : 'max-xl:hidden'
                }`}
            >
                <li className="max-h-[50px] h-[50px]">
                    <NavLink
                        to="/news"
                        className="text-[#262626] block text-[16px] py-[15px] px-[20px] rounded-[30px] border-solid border-[1px] border-[#26262626] text-center"
                    >
                        News
                    </NavLink>
                </li>
                <li className="max-h-[50px] h-[50px]">
                    <NavLink
                        to="/notices"
                        className="text-[#262626] block text-[16px] py-[15px] px-[20px] rounded-[30px] border-solid border-[1px] border-[#26262626] text-center"
                    >
                        Find pet
                    </NavLink>
                </li>
                <li className="max-h-[50px] h-[50px]">
                    <NavLink
                        to="/friends"
                        className="text-[#262626] block text-[16px] py-[15px] px-[20px] rounded-[30px] border-solid border-[1px] border-[#26262626] text-center"
                    >
                        Our friends
                    </NavLink>
                </li>
            </ul>
        </>
    );
}
