import { useLocation } from 'react-router';

export default function AuthTitle() {
    const location = useLocation().pathname;

    return (
        <div className="mb-[20px] md:mb-[32px]">
            <h3 className="text-[28px] leading-7 font-bold text-[#262626] tracking-[-1.12px] md:text-[54px] md:leading-[54px] md:tracking-[-2.16px] mb-3 md:mb-4">
                {location === '/register'
                    ? 'Registration'
                    : location === '/login' && 'Log in'}
            </h3>
            <p className="text-[14px] leading-[18px] font-medium text-[#262626] tracking-[-0.28px] md:text-[18px] md:leading-[22px] md:tracking-[-0.36px]">
                {location === '/register'
                    ? 'Thank you for your interest in our platform. '
                    : location === '/login' &&
                      'Welcome! Please enter your credentials to login to the platform.'}
            </p>
        </div>
    );
}
