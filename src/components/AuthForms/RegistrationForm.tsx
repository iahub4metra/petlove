import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthTitle from '../AuthTitle/AuthTitle';
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import FormLink from './FormLink';
import { registrationSchema } from '../../utils/validationSchema';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/operations';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegistrationForm() {
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
        handleSubmit,
        reset,
        watch,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur',
    });

    const emailError = errors.email;
    const emailTouched = touchedFields.email;

    const getEmailBorderColor = () => {
        if (!emailTouched) return '#26262626';
        if (emailError) return '#EF2447';
        return '#08AA83';
    };

    const onSubmit = (data: FormValues) => {
        const userCredentials = {
            name: data.name,
            email: data.email,
            password: data.password,
        };
        dispatch(signUp(userCredentials));
        reset();
    };

    return (
        <div className="bg-white rounded-[30px] py-[27px] px-[20px] md:py-[30px] md:px-[140px] xl:py-[77px] xl:px-[84px]">
            <AuthTitle />
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="false"
                className="flex flex-col gap-[10px] mb-3 md:mb-4"
            >
                <TextField
                    {...register('name')}
                    variant="outlined"
                    placeholder="Name"
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    sx={{
                        '& input:-webkit-autofill': {
                            boxShadow: '0 0 0 1000px white inset',
                            WebkitTextFillColor: '#262626CC',
                            borderRadius: '30px',
                            transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '& .MuiInputBase-root': {
                            borderRadius: '30px',
                            borderColor: '#26262626',
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
                />
                <TextField
                    {...register('email')}
                    variant="outlined"
                    placeholder="Email"
                    error={!!emailError}
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
                            '&:hover fieldset': {
                                borderColor: '#F6B83D',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#F6B83D',
                            },
                        },
                    }}
                    slots={{ input: OutlinedInput }}
                    slotProps={{
                        input: {
                            endAdornment: emailTouched && (
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
                            borderColor: '#26262626',
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
                        error={Boolean(errors.password?.message)}
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
                            borderColor: '#26262626',
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
                        {...register('confirmPassword', {
                            validate: (value) =>
                                value === watch('password') ||
                                'Паролі не співпадають',
                        })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        error={Boolean(errors.confirmPassword?.message)}
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
                    {errors.confirmPassword?.message && (
                        <FormHelperText>
                            {errors.confirmPassword.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <button
                    type="submit"
                    className="mt-[22px] text-white text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.42px] uppercase font-bold rounded-[30px] bg-[#F6B83D] py-[12px] md:py-[16px] w-full cursor-pointer hover:bg-[#F9B020] transition-colors"
                >
                    Registration
                </button>
            </form>
            <FormLink />
        </div>
    );
}
