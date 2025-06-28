import { Link } from 'react-router';

interface AuthNavProps {
    isMobile?: boolean;
}

export default function AuthNav({ isMobile = false }: AuthNavProps) {
    return (
        <>
            <ul
                className={`flex gap-2 text-center ${
                    isMobile ? 'flex-col md:flex-row w-full' : 'hidden md:flex'
                }`}
            >
                <li>
                    <Link
                        to="/login"
                        className="bg-[#F6B83D] block tracking-[-0.48px] text-white uppercase py-[15px] cursor-pointer px-[35px] rounded-[30px] leading-5 font-bold hover:bg-[#F9B020] transition-colors"
                    >
                        Log in
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className="bg-[#FFF4DF] block text-[#F6B83D] tracking-[-0.48px] cursor-pointer uppercase py-[15px] px-[20px] rounded-[30px] leading-5 font-bold hover:bg-[#FBE7C1] transition-colors"
                    >
                        Registration
                    </Link>
                </li>
            </ul>
        </>
    );
}
