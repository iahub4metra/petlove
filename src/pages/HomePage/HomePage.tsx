import Header from '../../components/Header/Header';

export default function HomePage() {
    return (
        <section className="home-container">
            <div className="px-[20px] pb-[50px] bg-[#F6B83D] rounded-[30px] pt-[18px]  md:px-[32px] md:pb-[44px] md:pt-[16px] xl:px-[64px] xl:pb-[32px] ">
                <Header />
                <div className="flex flex-col gap-[24px] md:gap-[32px] md:items-end xl:flex-row xl:justify-between xl:gap-0 pt-[60px] md:pt-[112px]">
                    <h1 className="text-white text-[50px] leading-12 font-bold tracking-[-1.5px] md:text-[80px] md:leading-[77px] md:tracking-[-2.4px] xl:text-[90px] xl:leading-[87px] xl:tracking-[-2.7px] xl:w-[760px]">
                        Take good <span className="text-[#FFFFFF66]">care</span>{' '}
                        of your small pets
                    </h1>
                    <p className="text-white text-[14px] font-medium tracking-[-0.28px] leading-[18px] md:text-[18px] md:leading-[22px] md:tracking-[-0.36px] md:w-[255px] md:h-[88px]">
                        Choosing a pet for your home is a choice that is meant
                        to enrich your life with immeasurable joy and
                        tenderness.
                    </p>
                </div>
            </div>
            <picture>
                <source
                    srcSet="/images/hero/mobile.jpg 1x, /images/hero/mobile@2x.jpg 2x"
                    media="(max-width: 767px)"
                />
                <source
                    srcSet="/images/hero/tablet.jpg 1x, /images/hero/tablet@2x.jpg 2x"
                    media="(min-width: 768px) and (max-width: 1279px)"
                />
                <source
                    srcSet="/images/hero/desk.jpg 1x, /images/hero/desk@2x.jpg 2x"
                    media="(min-width: 1280px)"
                />
                <img
                    src="/images/hero/mobile.jpg"
                    alt="Woman petting dog"
                    className="rounded-[30px] md:rounded-[60px]"
                />
            </picture>
        </section>
    );
}
