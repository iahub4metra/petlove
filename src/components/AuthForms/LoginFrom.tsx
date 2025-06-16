import {
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
} from '@mui/material';
import AuthTitle from '../AuthTitle/AuthTitle';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import FormLink from './FormLink';
import { useState } from 'react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };
    return (
        <div className="bg-white rounded-[30px] py-[27px] px-[20px] md:py-[30px] md:px-[140px] flex flex-col justify-center xl:px-[84px]">
            <AuthTitle />
            <form className="flex flex-col gap-[10px] mb-3 md:mb-4">
                <TextField
                    variant="outlined"
                    placeholder="Email"
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '30px',
                            borderColor: '#26262626',
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '12px',
                            fontSize: '14px',
                            color: '#262626CC',
                            lineHeight: '18px',
                            '@media screen and (min-width: 768px)': {
                                padding: '16px',
                                fontSize: '16px',
                                lineHeight: '20px',
                            },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            transition:
                                'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#F6B83D',
                            },
                        },
                    }}
                />
                <FormControl
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '30px',
                            borderColor: '#26262626',
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '12px',
                            fontSize: '14px',
                            color: '#262626CC',
                            lineHeight: '18px',
                            '@media screen and (min-width: 768px)': {
                                padding: '16px',
                                fontSize: '16px',
                                lineHeight: '20px',
                            },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            transition:
                                'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#F6B83D',
                            },
                        },
                    }}
                    variant="outlined"
                >
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the password'
                                            : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <MdVisibilityOff />
                                    ) : (
                                        <MdVisibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <button
                    type="submit"
                    className="mt-[22px] text-white text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.42px] uppercase font-bold rounded-[30px] bg-[#F6B83D] py-[12px] md:py-[16px] w-full cursor-pointer hover:bg-[#F9B020] transition-colors"
                >
                    Log in
                </button>
            </form>
            <FormLink />
        </div>
    );
}
