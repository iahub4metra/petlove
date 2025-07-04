import type { News } from '../App/types';

export interface NewsItemProps {
    item: News;
}

export default function NewsItem({ item }: NewsItemProps) {
    return (
        <>
            <img
                className="rounded-[15px] mb-5 md:mb-7 w-[335px] h-[190px] md:w-[340px] md:h-[226px] xl:w-[361px]"
                src={item.imgUrl}
                alt="news image"
            />
            <div className="mb-[19px] md:mb-7">
                <h4 className="text-[#262626] text-[16px] md:text-[20px] leading-5 md:leading-[26px] font-bold tracking-[-0.48px] md:tracking-[-0.6px] overflow-ellipsis overflow-hidden mb-3 md:mb-3.5 h-[40px] max-h-[40px] md:max-h-[52px] md:h-[52px]">
                    {item.title}
                </h4>
                <p className="text-[#262626] text-[14px] md:text-[16px] leading-[18px] md:leading-5 font-medium tracking-[-0.28px] md:tracking-[-0.32px] overflow-ellipsis overflow-hidden max-h-[80px] h-[80px]">
                    {item.text}
                </p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[#26262680] text-[14px] md:text-[16px] font-medium leading-[18px] md:leading-5 tracking-[-0.28px] md:tracking-[-0.32px]">
                    {item.date}
                </p>
                <a
                    href={item.url}
                    target="_blank"
                    className="text-[#F6B83D] text-[14px] md:text-[16px] leading-[18px] md:leading-5 font-medium tracking-[-0.28px] md:tracking-[-0.32px] underline decoration-skip-ink-none underline-offset-auto"
                >
                    Read more
                </a>
            </div>
        </>
    );
}
