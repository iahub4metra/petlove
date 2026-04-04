import { Skeleton } from '@mui/material';

export default function NewsListSkeleton() {
    return (
        <ul className="flex flex-col items-center gap-6 md:flex-wrap md:flex-row md:gap-x-6 md:gap-y-8 xl:gap-x-[35px] xl:gap-y-[40px]">
            {[...Array(6)].map((_, index) => (
                <li
                    key={index}
                    className="md:mb-7 max-w-[335px] md:max-w-[340px] md:h-[448px] xl:max-w-[360.5px]"
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            borderRadius: '15px',
                            marginBottom: '20px',
                            width: '335px',
                            height: '190px',
                            '@media screen and (min-width: 768px)': {
                                width: '340px',
                                height: '226px',
                                marginBottom: '28px',
                            },
                            '@media screen and (min-width: 1280px)': {
                                width: '361px',
                            },
                        }}
                    />
                    <div className="mb-[19px] md:mb-7">
                        <Skeleton
                            variant="text"
                            sx={{
                                height: '20px',
                                marginBottom: '12px',
                                '@media screen and (min-width: 768px)': {
                                    marginBottom: '14px',
                                    maxHeight: '52px',
                                    height: '52px',
                                },
                            }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{
                                height: '80px',
                                maxHeight: '80px',
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton
                            variant="text"
                            sx={{
                                height: '18px',
                                width: '80px',
                                '@media screen and (min-width: 768px)': {
                                    height: '20px',
                                },
                            }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{
                                height: '18px',
                                width: '70px',
                                '@media screen and (min-width: 768px)': {
                                    height: '20px',
                                },
                            }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}
