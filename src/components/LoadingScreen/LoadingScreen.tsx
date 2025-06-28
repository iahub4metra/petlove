import {
    Box,
    CircularProgress,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa6';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(85);
    const isLoading = progress < 100;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => Math.min(prev + 3, 100));
        }, 70);
        return () => {
            clearInterval(timer);
        };
    }, [progress]);

    let size = 270;

    const isTablet = useMediaQuery('(min-width: 768px)');

    if (isTablet) size = 396;

    return (
        <div className="w-[100vw] h-[100vh] bg-[#0000004D] fixed top-0 left-0 loading-image flex justify-center items-center ">
            {isLoading ? (
                <Box
                    sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        textAlign: 'center',
                    }}
                >
                    <CircularProgress
                        variant="determinate"
                        value={progress}
                        thickness={0.4}
                        size={size}
                        sx={{
                            '& circle': {
                                stroke: '#FFFFFF',
                                opacity: '0.3',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            sx={{
                                color: '#fff',
                                fontFamily: 'Manrope',
                                fontSize: {
                                    xs: '50px',
                                    sm: '80px',
                                },
                                letterSpacing: {
                                    xs: '-2px',
                                    sm: '-3.2px',
                                },
                                lineHeight: {
                                    xs: '50px',
                                    sm: '80px',
                                },
                                fontWeight: '700',
                            }}
                        >{`${Math.round(progress)}%`}</Typography>
                    </Box>
                </Box>
            ) : (
                <p className="text-white text-[50px] leading-[50px] tracking-[-2px] font-bold contents md:text-[100px] md:leading-[100px] md:tracking-[-4px]">
                    petl
                    <FaHeart className="fill-[#F6B83D] w-[44px] h-[44px] md:w-[82px] md:h-[82px]" />
                    ove
                </p>
            )}
        </div>
    );
}
