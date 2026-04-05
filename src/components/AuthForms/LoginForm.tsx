import {
    Button,
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
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/auth/operations';
import { selectAuthOperations } from '../../redux/auth/selectors';
import ErrorBanner from '../Errors/ErrorBanner';
import ErrorState from '../Errors/ErrorState';

interface FormValues {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const signInStatus = useSelector(selectAuthOperations).signIn;
    const prevStatus = useRef(signInStatus.status);

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
        if (signInStatus.status === 'succeeded') {
            reset();
        }
    };

    const getEmailBorderColor = () => {
        if (!touchedFields.email) return '#26262626';
        if (errors.email) return '#EF2447';
        return '#08AA83';
    };

    useEffect(() => {
        if (
            prevStatus.current !== 'failed' &&
            signInStatus.status === 'failed'
        ) {
            setOpenSnackbar(true);
        }
        prevStatus.current = signInStatus.status;
    }, [signInStatus.status]);

    if (signInStatus.error?.status === 500) {
        return <ErrorState error={signInStatus.error} />;
    }

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
                    error={
                        Boolean(errors.email) ||
                        Boolean(signInStatus.error?.status === 401)
                    }
                    helperText={
                        errors.email
                            ? errors.email.message
                            : signInStatus.error?.status === 401
                              ? 'Invalid email'
                              : null
                    }
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
                                    {errors.email ||
                                    signInStatus.error?.status === 401 ? (
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
                        error={
                            Boolean(errors.password) ||
                            Boolean(signInStatus.error?.status === 401)
                        }
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
                    {errors.password?.message ? (
                        <FormHelperText className="Mui-error">
                            {errors.password.message}
                        </FormHelperText>
                    ) : signInStatus.error?.status === 401 ? (
                        <FormHelperText className="Mui-error">
                            Invalid password
                        </FormHelperText>
                    ) : null}
                </FormControl>
                <Button
                    loading={signInStatus.status === 'loading'}
                    type="submit"
                    sx={{
                        marginTop: '22px',
                        color: 'white',
                        textTransform: 'uppercase',
                        borderRadius: '30px',
                        backgroundColor: '#F6B83D',
                        width: '100%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        lineHeight: '18px',
                        fontWeight: 'bold',
                        paddingBlock: '12px',
                        letterSpacing: '-0.42px',
                        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                        ':hover': {
                            backgroundColor: '#F9B020',
                        },
                        '@media screen and (min-width: 768px)': {
                            fontSize: '16px',
                            lineHeight: '20px',
                            paddingBlock: '16px',
                        },
                    }}
                >
                    Log in
                </Button>
            </form>
            <FormLink />
            <ErrorBanner
                open={openSnackbar}
                message={signInStatus.error?.message ?? null}
                onClose={() => setOpenSnackbar(false)}
            />
        </div>
    );
}
