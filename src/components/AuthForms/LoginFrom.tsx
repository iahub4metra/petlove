import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
} from '@mui/material';
import AuthTitle from '../AuthTitle/AuthTitle';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import FormLink from './FormLink';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/auth/operations';

interface FormValues {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch: AppDispatch = useDispatch();

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

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = (data: FormValues) => {
        const userCredentials = { email: data.email, password: data.password };
        dispatch(signIn(userCredentials));
        reset();
    };

    const getEmailBorderColor = () => {
        if (!touchedFields.email) return '#26262626';
        if (errors.email) return '#EF2447';
        return '#08AA83';
    };

    return (
        <div className="bg-white rounded-[30px] py-[27px] px-[20px] md:py-[30px] md:px-[140px] flex flex-col justify-center xl:px-[84px]">
            <AuthTitle />
            <form
                autoComplete="false"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[10px] mb-3 md:mb-4"
            >
                <TextField
                    {...register('email')}
                    variant="outlined"
                    placeholder="Email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    sx={{
                        '& input:-webkit-autofill': {
                            boxShadow: '0 0 0 1000px white inset',
                            WebkitTextFillColor: '#262626CC',
                            borderRadius: '30px',
                            transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '& .MuiInputBase-root': {
                            borderRadius: '30px',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#F6B83D',
                            },
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
                            '& fieldset': {
                                borderColor: getEmailBorderColor(),
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#F6B83D',
                            },
                        },
                    }}
                    slots={{ input: OutlinedInput }}
                    slotProps={{
                        input: {
                            endAdornment: touchedFields.email && (
                                <InputAdornment position="end">
                                    {errors.email ? (
                                        <CloseIcon className="text-[#EF2447]" />
                                    ) : (
                                        <CheckIcon className="text-[#08AA83]" />
                                    )}
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <FormControl
                    sx={{
                        '& input:-webkit-autofill': {
                            boxShadow: '0 0 0 1000px white inset',
                            WebkitTextFillColor: '#262626CC',
                            borderRadius: '30px',
                            transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '& .MuiInputBase-root': {
                            borderRadius: '30px',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#F6B83D',
                            },
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
                            '& fieldset': {
                                borderColor: '#26262626',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#F6B83D',
                            },
                        },
                    }}
                    variant="outlined"
                >
                    <OutlinedInput
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        error={Boolean(errors.password)}
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
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                        },
                                    }}
                                >
                                    {showPassword ? (
                                        <MdVisibilityOff className="fill-[#F6B83D]" />
                                    ) : (
                                        <MdVisibility className="fill-[#F6B83D]" />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password?.message && (
                        <FormHelperText>
                            {errors.password.message}
                        </FormHelperText>
                    )}
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
