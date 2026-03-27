import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    MenuItem,
    Select,
    styled,
    TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IoMdFemale } from 'react-icons/io';
import { IoMdMale } from 'react-icons/io';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { LiaPawSolid } from 'react-icons/lia';
import { addPetSchema } from '../../utils/validationSchema';
import { useEffect, useState } from 'react';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getSpecies } from '../../redux/notices/operations';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export interface FormValues {
    title: string;
    name: string;
    birthday: string;
    species: string;
    imgUrl: string;
    sex: string;
}

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

export default function AddPetForm() {
    const dispatch: AppDispatch = useDispatch();
    const [species, setSpecies] = useState<string[]>();
    const [photoURL, setPhotoURL] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        reset,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(addPetSchema) });

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const result = await dispatch(getSpecies()).unwrap();
                setSpecies(result);
            } catch (err) {
                console.error('Failed to fetch species:', err);
            }
        };
        fetchSpecies();
    }, [dispatch]);

    const imgUrlInputValue = watch('imgUrl');

    const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
            setValue('imgUrl', data.secure_url);
        } catch (error) {
            console.log(error); // зробити щось !!!!!!!

            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const imgSrc = photoURL || imgUrlInputValue;
    const onSubmit = (data: FormValues) => {
        console.log('submitted', data);
        reset();
    };

    return (
        <div className="bg-white rounded-[30px] px-5 py-[28px] md:py-[40px] md:flex flex-col items-center mt-2.5 md:mt-[16px]">
            <h3 className="text-[28px] md:text-[32px] leading-7 md:leading-8 font-bold text-[#262626] tracking-[-0.36px] flex items-center gap-2">
                Add my pet /{' '}
                <span className="font-bold text-[14px] md:text-[16px] text-[#2B2B2A40] leading-[18px] md:leading-5">
                    Personal details
                </span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-start gap-2 mt-6">
                    <label className="relative bg-[#F43F5E10] w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center has-checked:bg-[#F43F5E]">
                        <input
                            type="radio"
                            value="Female"
                            {...register('sex')}
                            className="absolute top-0 left-0 opacity-0 cursor-pointer peer"
                        />
                        <IoMdFemale className="h-[15px] w-[15px] md:h-[18px] md:w-[18px] fill-[#F43F5E] peer-checked:fill-white" />
                    </label>
                    <label className="relative bg-[#54ADFF10] w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center has-checked:bg-[#54ADFF]">
                        <input
                            type="radio"
                            value="Male"
                            {...register('sex')}
                            className="absolute top-0 left-0 opacity-0 cursor-pointer peer"
                        />
                        <IoMdMale className="h-[15px] w-[15px] md:h-[18px] md:w-[18px] fill-[#54ADFF] -rotate-45 peer-checked:fill-white" />
                    </label>
                    <label className="relative bg-[#FFF4DF] w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center has-checked:bg-[#F6B83D]">
                        <input
                            type="radio"
                            value="Multiple"
                            {...register('sex')}
                            className="absolute top-0 left-0 opacity-0 cursor-pointer peer"
                        />
                        <div className="relative peer-checked:fill-white fill-[#F6B83D]">
                            <IoMdFemale className="absolute -bottom-[11px] -right-[5px] fill-inherit" />
                            <IoMdMale className="absolute -bottom-[5px] -left-[5px] fill-inherit" />
                        </div>
                    </label>
                </div>
                {imgSrc ? (
                    <Avatar
                        src={imgSrc}
                        alt="Pet’s photo"
                        sx={{
                            width: 68,
                            height: 68,
                            '@media screen and (min-width: 768px)': {
                                width: 86,
                                height: 86,
                            },
                        }}
                    />
                ) : (
                    <div className="bg-[#FFF4DF] rounded-full flex justify-center items-center w-[68px] h-[68px] md:w-[86px] md:h-[86px]">
                        <LiaPawSolid className="fill-[#F6B83D] w-[34px] h-[34px] md:w-[44px] md:h-[44px]" />
                    </div>
                )}
                <div className="flex gap-2 md:gap-0 md:justify-between mt-[16px]">
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
                                '@media screen and (min-width: 768px)': {
                                    width: '226px',
                                },
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
                        type="text"
                        placeholder="Enter URL"
                        variant="outlined"
                        {...register('imgUrl')}
                        helperText={errors.imgUrl?.message}
                        error={Boolean(errors.imgUrl)}
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
                            onChange={onFileUpload}
                        />
                    </Button>
                </div>
                <div className="flex flex-col gap-2.5 md:gap-[18px] mt-2.5 md:mt-[18px] mb-[200px]">
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
                        type="text"
                        {...register('title')}
                        placeholder="Title"
                        variant="outlined"
                        helperText={errors.title?.message}
                        error={Boolean(errors.title)}
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
                        type="text"
                        {...register('name')}
                        placeholder="Pet’s Name"
                        variant="outlined"
                        helperText={errors.name?.message}
                        error={Boolean(errors.name)}
                    />
                    <div className="flex flex-wrap">
                        <Controller
                            control={control}
                            name="birthday"
                            render={({ field }) => (
                                <DateField
                                    value={
                                        field.value ? dayjs(field.value) : null
                                    }
                                    format="DD.MM.YYYY"
                                    onChange={(value) => {
                                        field.onChange(
                                            value
                                                ? dayjs(value).format(
                                                      'YYYY-MM-DD',
                                                  )
                                                : '',
                                        );
                                    }}
                                />
                            )}
                        />

                        <div>
                            <Controller
                                control={control}
                                name="species"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        id="demo-simple-select"
                                        displayEmpty
                                        {...field}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return (
                                                    <span
                                                        className={`text-[#26262650] text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px]`}
                                                    >
                                                        Type of pet
                                                    </span>
                                                );
                                            }

                                            return (
                                                selected
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                selected.slice(1)
                                            );
                                        }}
                                        sx={{
                                            width: '100%',
                                            bgcolor: 'white',
                                            borderColor: '#26262626',
                                            borderRadius: '30px',
                                            '&.MuiOutlinedInput-root': {
                                                borderRadius: '30px',
                                                transition:
                                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                                '& fieldset': {
                                                    borderColor: '#26262626',
                                                },

                                                '&:hover fieldset': {
                                                    borderColor: '#F6B83D',
                                                },

                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#F6B83D',
                                                },
                                            },
                                            '& .MuiSelect-select': {
                                                padding: '12px',
                                                '@media screen and (min-width: 768px)':
                                                    {
                                                        padding: '16px',
                                                    },
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    borderRadius: '15px',
                                                    padding: '12px',
                                                },
                                            },
                                            MenuListProps: {
                                                sx: {
                                                    display: 'flex',
                                                    gap: '8px',
                                                    flexDirection: 'column',
                                                    padding: '0',
                                                    maxHeight: '73px',
                                                    overflowY: 'auto',
                                                    '@media screen and (min-width: 768px)':
                                                        {
                                                            maxHeight: '142px',
                                                        },
                                                    '@media screen and (min-width: 1280px)':
                                                        {
                                                            maxHeight: '126px',
                                                        },
                                                    '&::-webkit-scrollbar': {
                                                        width: '8px',
                                                    },
                                                    '&::-webkit-scrollbar-thumb':
                                                        {
                                                            bgcolor:
                                                                '#26262614',
                                                            borderRadius:
                                                                '13px',
                                                        },
                                                },
                                            },
                                        }}
                                    >
                                        {species?.map((type) => (
                                            <MenuItem
                                                key={type}
                                                value={type}
                                                sx={{
                                                    color: '#26262699',
                                                    font: '500 14px/18px "Manrope", sans-serif',
                                                    letterSpacing: '-0.42px',
                                                    padding: '0',
                                                    minHeight: 'auto',
                                                    transition:
                                                        'all 200ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                                    '&:hover': {
                                                        color: '#F6B83D',
                                                        bgcolor: 'transparent',
                                                    },
                                                    '@media screen and (min-width: 768px)':
                                                        {
                                                            font: '500 16px/20px "Manrope", sans-serif',
                                                            letterSpacing:
                                                                '-0.48px',
                                                        },
                                                    '&.Mui-selected': {
                                                        bgcolor: 'transparent',
                                                        color: '#F6B83D',
                                                        '&:hover': {
                                                            bgcolor:
                                                                'transparent',
                                                        },
                                                    },
                                                }}
                                            >
                                                {type.charAt(0).toUpperCase() +
                                                    type.slice(1)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="text-white text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px] font-bold rounded-[30px] bg-[#F6B83D] py-[12px] md:py-[14px] px-[26px] md:px-[58px] cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
