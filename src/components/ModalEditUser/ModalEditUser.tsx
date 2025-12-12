import { Avatar, Button, Modal, styled, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalEditUser } from '../../redux/uiState/selectors';
import type { AppDispatch } from '../../redux/store';
import { manageModalEditUser } from '../../redux/uiState/slice';
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5';
import { selectUser } from '../../redux/auth/selectors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUserSchema } from '../../utils/validationSchema';
import { useEffect, useState } from 'react';
import { FaUserLarge } from 'react-icons/fa6';
import { editUser } from '../../redux/auth/operations';

export type FormValues = {
    name: string;
    email: string;
    avatar: string;
    phone: string;
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ModalEditUser() {
    const isOpen = useSelector(selectModalEditUser);
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    const [photoURL, setPhotoURL] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const avatarSrc =
        photoURL || (user && 'avatar' in user ? user.avatar : undefined);

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(editUserSchema),
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            phone: user && 'phone' in user ? user.phone : '',
            avatar: user && 'avatar' in user ? user?.avatar : '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        await dispatch(editUser(data));
        reset();
        dispatch(manageModalEditUser(false));
    };

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);

        try {
            setLoading(true);
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CLOUD_NAME
                }/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            const data = await res.json();
            setPhotoURL(data.secure_url);
            setValue('avatar', data.secure_url);
        } catch (error) {
            console.log(error); // зробити щось !!!!!!!

            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                phone: 'phone' in user ? user.phone || '' : '',
                avatar: 'avatar' in user ? user.avatar || '' : '',
            });
        }
    }, [user, reset]);

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
            <div className="bg-white rounded-[30px] max-w-[335px] md:max-w-[480px] top-2/4 left-3/6 translate-[-50%] relative py-10 px-5 md:p-[50px]">
                <button
                    onClick={() => dispatch(manageModalEditUser(false))}
                    className="border-0 bg-transparent hover:scale-[105%] transition-all hover:rotate-180 absolute top-[20px] right-[20px]"
                >
                    <IoClose className=" w-[24px] h-[24px]" />
                </button>
                <h4 className="text-[20px] text-[#262626] font-bold leading-5 mb-5 text-left md:text-[18px] md:leading-6">
                    Edit information
                </h4>
                <div className="flex justify-center mb-3">
                    {avatarSrc ? (
                        <Avatar
                            alt={user?.name}
                            src={avatarSrc}
                            sx={{
                                width: 80,
                                height: 80,
                                '@media screen and (min-width: 768px)': {
                                    width: 86,
                                    height: 86,
                                },
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-[80px] h-[80px] md:w-[86px] md:h-[86px] rounded-full bg-[#FFF4DF]">
                            <FaUserLarge className="fill-[#F6B83D] w-[40px] h-[40px]" />
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-2 md:gap-0 md:justify-between">
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
                                        width: '161px',
                                        '@media screen and (min-width: 768px)':
                                            { width: '226px' },
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
                                        '@media screen and (min-width: 768px)':
                                            {
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
                                type="text"
                                {...register('avatar')}
                                placeholder="Enter URL"
                                variant="outlined"
                                error={Boolean(errors.avatar)}
                                helperText={errors.avatar?.message}
                            />
                            <Button
                                component="label"
                                variant="contained"
                                loading={loading}
                                endIcon={
                                    <IoCloudUploadOutline className="w-[18px] h-[18px] stroke-[#F6B83D] m-0" />
                                }
                                sx={{
                                    border: '0',
                                    backgroundColor: '#FFF4DF',
                                    color: '#262626',
                                    boxShadow: '0',
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    padding: '12px',
                                    '&:hover': {
                                        boxShadow: '0',
                                    },
                                    '@media screen and (min-width: 768px)': {
                                        width: '146px',
                                        fontSize: '14px',
                                        lineHeight: '18px',
                                        letterSpacing: '-0.24px',
                                    },
                                }}
                            >
                                Upload photo
                                <VisuallyHiddenInput
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .gif, .webp, .bmp"
                                    onChange={onChange}
                                />
                            </Button>
                        </div>
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
                                        borderColor: '#26262626',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6B83D',
                                    },
                                },
                            }}
                            type="email"
                            {...register('email')}
                            placeholder="Email"
                            variant="outlined"
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
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
                                        borderColor: '#26262626',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#F6B83D',
                                    },
                                },
                            }}
                            type="text"
                            {...register('phone')}
                            placeholder="Phone number"
                            variant="outlined"
                            error={Boolean(errors.phone)}
                            helperText={errors.phone?.message}
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-[30px] text-white text-[14px] md:text-[16px] md:leading-5 bg-[#F6B83D] hover:bg-[#F9B020] cursor-pointer block p-3 md:p-4 w-full font-bold leading-[18px] tracking-[-0.36px] mt-[20px] md:mt-[30px]"
                    >
                        Save
                    </button>
                </form>
            </div>
        </Modal>
    );
}
