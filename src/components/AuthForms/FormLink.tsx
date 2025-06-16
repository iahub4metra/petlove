import { Link, useLocation } from 'react-router';

export default function FormLink() {
    const location = useLocation().pathname;

    const isRegistration = location === '/register';
    const isLogin = location === '/login';

    return (
        <p className="text-[#26262680] text-[12px] md:text-[14px] leading-3.5 md:leading-5 font-medium tracking-[-0.36px] md:tracking-[-0.42px] text-center">
            {isRegistration
                ? 'Already have an account?'
                : isLogin && 'Don’t have an account?'}
            <Link
                to={isRegistration ? '/login' : isLogin ? '/register' : '/'}
                className="text-[#F6B83D] text-[12px] md:text-[14px] leading-3.5 md:leading-5 font-bold tracking-[-0.36px] md:tracking-[-0.42px] underline decoration-skip-ink-none underline-offset-auto"
            >
                {isRegistration ? 'Login' : isLogin && 'Register'}
            </Link>
        </p>
    );
}
