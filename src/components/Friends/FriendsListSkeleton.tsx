import { Skeleton } from '@mui/material';

export default function FriendsListSkeleton() {
    return (
        <ul className="flex flex-col gap-5 md:flex-wrap md:flex-row xl:gap-y-7 xl:gap-x-5">
            {[...Array(9)].map((_, index) => (
                <li
                    key={index}
                    className="relative rounded-[15px] bg-white w-[335px] md:w-[342px] xl:w-[370px] flex gap-4 justify-center items-center py-[40px] px-[20px]"
                >
                    <Skeleton
                        variant="circular"
                        sx={{
                            width: '80px',
                            height: '80px',
                            '@media screen and (min-width: 768px)': {
                                width: '90px',
                                height: '90px',
                            },
                        }}
                    />
                    <div>
                        <Skeleton
                            variant="text"
                            sx={{
                                marginBottom: '14px',
                                height: '20px',
                                width: '70px',
                            }}
                        />
                        <div className="flex flex-col gap-2">
                            <Skeleton
                                variant="text"
                                sx={{ height: '18px', width: '196px' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ height: '18px', width: '196px' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ height: '18px', width: '196px' }}
                            />
                        </div>
                    </div>
                    <div className="absolute top-[12px] right-[12px]">
                        <Skeleton
                            variant="text"
                            sx={{ height: '16px', width: '88px' }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}
