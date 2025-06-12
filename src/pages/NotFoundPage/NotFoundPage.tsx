import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <section className="adaptive-container">
            <div className=" bg-[#F6B83D] rounded-[30px] flex flex-col items-center py-[245px] px-[33px] md:py-[241px] md:px-[32px] xl:py-[109px] xl:px-[283px]">
                <div className="flex items-center gap-[8px] md:gap-0 mb-[20px] md:mb-[40px]">
                    <p className="text-[120px] font-extrabold md:text-[300px] text-white">
                        4
                    </p>
                    <div>
                        <picture>
                            <source
                                srcSet="/images/not-found-mobile.png 1x, /images/not-found-mobile@2x.png 2x"
                                media="(max-width: 767px)"
                            />
                            <source
                                srcSet="/images/not-found-tablet.png 1x, /images/not-found-tablet@2x.png 2x"
                                media="(min-width: 768px)"
                            />
                            <source
                                srcSet="/images/not-found-desc.png 1x, /images/not-found-desc@2x.png 2x"
                                media="(min-width: 1280px)"
                            />
                            <img
                                src="/images/not-found-mobile.png"
                                alt=""
                                className="rounded-full bg-[#FFFFFF1A]"
                            />
                        </picture>
                    </div>
                    <p className="text-[120px] font-extrabold md:text-[300px] text-white">
                        4
                    </p>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <p className="mb-[20px] font-bold leading-5 text-[16px] text-white md:text-[24px] md:leading-7">
                        Ooops! This page not found :(
                    </p>
                    <Link
                        className="text-[#F6B83D] font-bold text-[14px] leading-[18px] bg-[#FFF4DF] py-[12px] px-[30px] md:py-[14px] rounded-[30px] md:text-[16px] md:leading-5"
                        to="/"
                    >
                        To home page
                    </Link>
                </div>
            </div>
        </section>
    );
}
