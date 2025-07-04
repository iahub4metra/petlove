import { InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IoSearchSharp } from 'react-icons/io5';
import CloseIcon from '@mui/icons-material/Close';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setKeyword } from '../../redux/news/slice';

export interface SearchFieldProps {
    action: ActionCreatorWithPayload<string>;
}

interface FormValues {
    keyword: string;
}

export default function SearchField({ action }: SearchFieldProps) {
    const dispatch: AppDispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        //formState: { touchedFields },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        dispatch(action(data.keyword.trim()));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('keyword')}
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                        '& input:-webkit-autofill': {
                            boxShadow: '0 0 0 1000px white inset',
                            WebkitTextFillColor: '#262626CC',
                            borderRadius: '30px',
                            transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '& .MuiInputBase-root': {
                            borderRadius: '30px',
                            width: '335px',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#F6B83D',
                            },
                            '@media screen and (min-width: 768px)': {
                                width: '230px',
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '12px',
                            fontSize: '14px',
                            color: '#262626CC',
                            lineHeight: '18px',
                            '@media screen and (min-width: 768px)': {
                                padding: '14px',
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
                    slots={{ input: OutlinedInput }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    {watch('keyword') && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                dispatch(setKeyword(''));
                                                reset();
                                            }}
                                        >
                                            <CloseIcon className="w-[18px] h-[18px] mr-[4px] fill-black" />
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="cursor-pointer hover:scale-[1.1]"
                                    >
                                        <IoSearchSharp className="w-[18px] h-[18px] " />
                                    </button>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </form>
        </div>
    );
}
