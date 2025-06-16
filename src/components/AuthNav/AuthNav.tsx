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
                        className="bg-[#F6B83D] block text-white uppercase py-[15px] px-[35px] rounded-[30px] leading-5 font-bold"
                    >
                        Log in
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className="bg-[#FFF4DF] block text-[#F6B83D] uppercase py-[15px] px-[20px] rounded-[30px] leading-5 font-bold"
                    >
                        Register
                    </Link>
                </li>
            </ul>
        </>
    );
}
