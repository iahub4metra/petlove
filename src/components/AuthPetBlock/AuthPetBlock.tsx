import { useLocation } from 'react-router';

export default function AuhtPetBlock() {
    const location = useLocation().pathname;
    const isRegister = location === '/register';
    const isLogin = location === '/login';

    const imagePrefix = isRegister
        ? '/images/register'
        : isLogin
        ? '/images/login'
        : null;

    return (
        <div className="relative rounded-[30px] xl:h-[654px] bg-[#F6B83D] recktangle bg-[url(/images/Rectangle.png)] bg-no-repeat bg-bottom-right bg-size-[300px_241px] md:bg-size-[528px_251px] md:bg-position-[125px_bottom] xl:w-[592px] xl:bg-[url(/images/bg-pet-desc.png)] xl:bg-size-[512px_598px] xl:bg-position-[center_bottom]">
            <picture>
                <source
                    srcSet={`${imagePrefix}/mobile.png 1x, ${imagePrefix}/mobile@2x.png 2x`}
                    media="(max-width: 767px)"
                />
                <source
                    srcSet={`${imagePrefix}/tablet.png 1x, ${imagePrefix}/tablet@2x.png 2x`}
                    media="(min-width: 768px) and (max-width: 1279px)"
                />
                <source
                    srcSet={`${imagePrefix}/desc.png 1x, ${imagePrefix}/desc@2x.png 2x`}
                    media="(min-width: 1280px)"
                />
                <img
                    src={`${imagePrefix}/mobile.png`}
                    alt="cat"
                    className="mr-[90px] ml-auto xl:mr-[20px] xl:h-[654px]"
                />
            </picture>
            <div className="hidden px-4 pb-[18px] pt-4 bg-white rounded-[20px] md:flex gap-2 w-[294px] absolute bottom-[32px] left-[32px] xl:bottom-[97px] xl:left-[61px]">
                <div className="w-[60px] h-[60px] bg-[#FFF4DF] rounded-full px-[14px] pt-[12px] pb-[16px] text-[32px] leading-8">
                    {isRegister ? '🐈' : isLogin && '🐶'}
                </div>
                <div>
                    <div className="flex items-center gap-12 mb-2">
                        <h4 className="text-[#F6B83D] text-[16px] font-bold leading-5">
                            {isRegister ? 'Jack' : isLogin && 'Rich'}
                        </h4>
                        <p className="text-[#26262680] text-[12px] font-medium leading-3.5">
                            Birthday:
                            <span className="text-[#262626]">
                                {isRegister
                                    ? '18.10.2021'
                                    : isLogin && '21.09.2020'}
                            </span>
                        </p>
                    </div>
                    <p className="text-[#262626CC] text-[12px] font-medium leading-3.5 tracking-[-0.24px]">
                        {isRegister
                            ? 'Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.'
                            : isLogin &&
                              'Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!'}
                    </p>
                </div>
            </div>
        </div>
    );
}
