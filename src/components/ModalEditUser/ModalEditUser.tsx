import { Modal, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalEditUser } from '../../redux/uiState/selectors';
import type { AppDispatch } from '../../redux/store';
import { manageModalEditUser } from '../../redux/uiState/slice';
import { IoClose } from 'react-icons/io5';
import { selectUser } from '../../redux/auth/selectors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUserSchema } from '../../utils/validationSchema';
import type { InferType } from 'yup';

type FormValues = InferType<typeof editUserSchema>;

export default function ModalEditUser() {
    const isOpen = useSelector(selectModalEditUser);
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        resolver: yupResolver(editUserSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user && 'phone' in user ? user.phone : '',
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        reset();
    };

    const getEmailBorderColor = () => {
        if (!touchedFields.email) return '#26262626';
        if (errors.email) return '#EF2447';
        return '#08AA83';
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => dispatch(manageModalEditUser(false))}
            sx={{
                '& .MuiModal-backdrop': {
                    bgcolor: '#2626264D',
                },
            }}
        >
            <div className="bg-white rounded-[30px] max-w-[335px] md:max-w-[480px] top-2/4 left-3/6 translate-[-50%] relative py-10 px-5">
                <button
                    onClick={() => dispatch(manageModalEditUser(false))}
                    className="border-0 bg-transparent hover:scale-[105%] transition-all hover:rotate-180 absolute top-[20px] right-[20px]"
                >
                    <IoClose className=" w-[24px] h-[24px]" />
                </button>
                <h4 className="text-[20px] text-[#262626] font-bold leading-5 mb-5 text-left">
                    Edit information
                </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-[10px]">
                        <TextField
                            sx={{
                                '& input:-webkit-autofill': {
                                    boxShadow: '0 0 0 1000px white inset',
                                    WebkitTextFillColor: '#262626CC',
                                    borderRadius: '30px',
                                    transition:
                                        'background-color 5000s ease-in-out 0s',
                                },
                                '& .MuiInputBase-root': {
                                    borderRadius: '30px',
                                    borderColor: '#26262626',
                                    '&:hover .MuiOutlinedInput-notchedOutline':
                                        {
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
                            className="p-[12px] leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] focus:border-[#F6B83D] not-placeholder-shown:border-[#F6B83D]"
                            type="text"
                            {...register('name')}
                            placeholder="Name"
                            variant="outlined"
                        />
                        <TextField
                            sx={{
                                '& input:-webkit-autofill': {
                                    boxShadow: '0 0 0 1000px white inset',
                                    WebkitTextFillColor: '#262626CC',
                                    borderRadius: '30px',
                                    transition:
                                        'background-color 5000s ease-in-out 0s',
                                },
                                '& .MuiInputBase-root': {
                                    borderRadius: '30px',
                                    '&:hover .MuiOutlinedInput-notchedOutline':
                                        {
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
                            className="p-[12px] focus:border-[#F6B83D] leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                            type="email"
                            {...register('email')}
                            placeholder="Email"
                            variant="outlined"
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <input
                            className="p-[12px] focus:border-[#F6B83D] leading-[18px] text-[14px] font-medium tracking-[-0.36px] rounded-[30px] outline-0 border border-[#26262615] not-placeholder-shown:border-[#F6B83D]"
                            type="text"
                            {...register('phone')}
                            placeholder="Phone Number"
                        />
                        <input type="file" />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
