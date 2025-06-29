import { useLocation } from 'react-router';

export default function PagesTitle() {
    const location = useLocation();

    const title =
        location.pathname === '/news'
            ? 'News'
            : location.pathname === '/notices'
            ? 'Find your favourite pet'
            : location.pathname === '/friends' && 'Our friends';

    return (
        <h2 className="text-[#262626] text-[28px] font-bold leading-7 tracking-[-0.84px] mb-[20px] md:text-[54px] md:leading-[54px] md:tracking-[-1.62px]">
            {title}
        </h2>
    );
}
