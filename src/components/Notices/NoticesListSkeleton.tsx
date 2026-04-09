import { Skeleton } from '@mui/material';

export default function NoticesListSkeleton() {
    return (
        <ul
            className={`flex flex-col gap-5 md:flex-row md:flex-wrap xl:gap-x-[31px] xl:gap-y-10`}
        >
            {[...Array(6)].map((_, index) => (
                <li
                    key={index}
                    className={`bg-white rounded-[16px] p-[24px] max-w-[335px] w-full md:w-[342px] md:max-w-[342px] xl:w-[363px] xl:max-w-[363px]`}
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: '287px',
                            height: '178px',
                            borderRadius: '16px',
                            marginBottom: '24px',
                            '@media screen and (min-width: 768px)': {
                                width: '294px',
                            },
                            '@media screen and (min-width: 1280px)': {
                                width: '315px',
                            },
                        }}
                    />
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Skeleton
                                variant="text"
                                sx={{ height: '20px', width: '190px' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ height: '18px', width: '30px' }}
                            />
                        </div>
                        <ul className="flex items-center gap-2 min-[375px]:gap-3.5 mb-4">
                            {[...Array(5)].map((_, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col gap-0.5 items-start"
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{ height: '14px', width: '30px' }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        sx={{ height: '14px', width: '40px' }}
                                    />
                                </li>
                            ))}
                        </ul>
                        <Skeleton
                            variant="rectangular"
                            sx={{ height: '36px', marginBottom: '16px' }}
                        />
                        <Skeleton
                            variant="text"
                            sx={{
                                marginBottom: '12px',
                                height: '20px',
                                width: '62px',
                                '@media screen and (min-width: 768px': {
                                    height: '24px',
                                },
                            }}
                        />
                        <div className="flex gap-2.5 items-center">
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    borderRadius: '30px',
                                    height: '46px',
                                    width: '231px',
                                    '@media screen and (min-width: 768px)': {
                                        height: '48px',
                                        width: '236px',
                                    },
                                    '@media screen and (min-width: 1280px)': {
                                        width: '257px',
                                    },
                                }}
                            />
                            <Skeleton
                                variant="circular"
                                sx={{
                                    width: '46px',
                                    height: '46px',
                                    '@media screen and (min-width: 768px)': {
                                        height: '48px',
                                        width: '48px',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
