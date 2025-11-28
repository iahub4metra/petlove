import { InputAdornment, OutlinedInput, TextField } from '@mui/material';
import {
    useForm,
    type UseFormRegisterReturn,
    type UseFormReset,
    type UseFormWatch,
} from 'react-hook-form';
import { IoSearchSharp } from 'react-icons/io5';
import CloseIcon from '@mui/icons-material/Close';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface FormValues {
    keyword: string;
    category?: string;
    sex?: string;
    species?: string;
    locationId?: string;
}

export interface SearchFieldProps<T> {
    action: ActionCreatorWithPayload<string>;
    actionClear: ReturnType<ActionCreatorWithPayload<T>>;
    asForm?: boolean;
    formRegister?: UseFormRegisterReturn;
    watch?: UseFormWatch<FormValues>;
    reset?: UseFormReset<FormValues>;
}

export default function SearchField<T>({
    action,
    actionClear,
    asForm = false,
    formRegister,
    watch,
    reset,
}: SearchFieldProps<T>) {
    const dispatch: AppDispatch = useDispatch();

    const useOwnForm = !formRegister;
    const {
        register,
        handleSubmit,
        watch: localWatch,
        reset: localReset,
    } = useForm<FormValues>();

    const submitHandler = (data: FormValues) => {
        const raw = data.keyword.trim();
        dispatch(action(raw));
    };

    const effectiveReset = reset || localReset;

    const keywordValue =
        typeof watch === 'function' ? watch('keyword') : localWatch('keyword');

    const input = (
        <TextField
            {...(formRegister || register('keyword'))}
            variant="outlined"
            placeholder="Search"
            fullWidth
            sx={{
                '& input:-webkit-autofill': {
                    boxShadow: '0 0 0 1000px white inset',
                    WebkitTextFillColor: '#262626CC',
                    borderRadius: '30px',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                '& .MuiInputBase-root': {
                    borderRadius: '30px',
                    maxHeight: '48px',
                    //width: '100%',
                    //maxWidth: !formRegister ? '335px' : '295px',
                    bgcolor: 'white',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: !formRegister ? '#F6B83D' : 'transparent',
                    },
                    // '@media screen and (min-width: 768px)': {
                    //     maxWidth: !formRegister ? '230px' : '265px',
                    // },
                },
                '& .MuiOutlinedInput-input': {
                    padding: '12px',
                    fontSize: '14px',
                    color: '#262626',
                    lineHeight: '18px',
                    fontFamily: 'Manrope',
                    '@media screen and (min-width: 768px)': {
                        padding: '14px',
                        fontSize: '16px',
                        lineHeight: '20px',
                    },
                    '&::placeholder': {
                        color: formRegister ? '#262626' : '#262626CC',
                        opacity: '1',
                    },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    transition: 'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: !formRegister
                            ? '#26262626'
                            : 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: !formRegister ? '#F6B83D' : 'transparent',
                    },
                },
            }}
            slots={{ input: OutlinedInput }}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            {keywordValue && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch(actionClear);
                                        effectiveReset?.();
                                    }}
                                >
                                    <CloseIcon className="w-[18px] h-[18px] mr-[4px] fill-black" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="cursor-pointer hover:scale-[1.1]"
                            >
                                <IoSearchSharp className="w-[18px] h-[18px]" />
                            </button>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );

    return useOwnForm && asForm ? (
        <form
            className="w-full max-w-[335px] md:max-w-[230px]"
            onSubmit={handleSubmit(submitHandler)}
        >
            {input}
        </form>
    ) : (
        <div
            className="w-full max-w-[295px] md:max-w-[265px]"
            onSubmit={handleSubmit(submitHandler)}
        >
            {input}
        </div>
    );
}
