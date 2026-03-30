import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    FormHelperText,
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
import { FiCalendar } from 'react-icons/fi';
import { addPetSchema } from '../../utils/validationSchema';
import { useEffect, useState } from 'react';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getSpecies } from '../../redux/notices/operations';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Link } from 'react-router';

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
        <div className="bg-white rounded-[30px] px-5 py-[28px] md:py-[40px] md:flex flex-col items-center mt-2.5 md:mt-[16px] xl:mt-0 xl:px-[80px]">
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-[432px]">
                <h3 className="text-[28px] md:text-[32px] leading-7 md:leading-8 font-bold text-[#262626] tracking-[-0.36px] flex items-center gap-2 text-start">
                    Add my pet /{' '}
                    <span className="font-bold text-[14px] md:text-[16px] text-[#2B2B2A40] leading-[18px] md:leading-5">
                        Personal details
                    </span>
                </h3>
                <div className="flex items-center justify-start gap-2 mt-6 md:mt-10">
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
                <div className="flex justify-center mt-2 md:-mt-[22px]">
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
                </div>

                <div className="flex gap-2 mt-[16px] md:mt-3">
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
                                width: '170px',
                                maxHeight: '36px',
                                '@media screen and (min-width: 768px)': {
                                    width: '278px',
                                    maxHeight: '42px',
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
                                    borderColor: `${
                                        watch('imgUrl')
                                            ? '#F6B83D'
                                            : '#26262626'
                                    }`,
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
                            <IoCloudUploadOutline className="w-[16px] md:w-[18px] h-[16px] md:h-[18px] stroke-[#F6B83D] m-0" />
                        }
                        sx={{
                            border: '0',
                            maxHeight: '36px',
                            backgroundColor: '#FFF4DF',
                            width: '117px',
                            color: '#262626',
                            boxShadow: '0',
                            borderRadius: '30px',
                            textTransform: 'none',
                            fontSize: '12px',
                            lineHeight: '16px',
                            padding: '10px',
                            '&:hover': {
                                boxShadow: '0',
                            },
                            '@media screen and (min-width: 768px)': {
                                width: '146px',
                                fontSize: '14px',
                                lineHeight: '18px',
                                letterSpacing: '-0.24px',
                                maxHeight: '42px',
                                paddingBlock: '12px',
                                paddingInline: '16px',
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
                <div className="flex flex-col gap-2.5 md:gap-[18px] mt-2.5 md:mt-[18px] mb-[31px] md:mb-[40px]">
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
                                maxHeight: '42px',
                                '@media screen and (min-width: 768px)': {
                                    maxHeight: '52px',
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
                                    borderColor: `${
                                        watch('title') ? '#F6B83D' : '#26262626'
                                    }`,
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
                                maxHeight: '42px',
                                '@media screen and (min-width: 768px)': {
                                    maxHeight: '52px',
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
                                    borderColor: `${
                                        watch('name') ? '#F6B83D' : '#26262626'
                                    }`,
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
                    <div className="flex flex-wrap gap-2 md:gap-3">
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
                                    endAdornment={
                                        <FiCalendar className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                    }
                                    sx={{
                                        '& .MuiPickersInputBase-root': {
                                            borderRadius: '30px',
                                            maxWidth: '144px',
                                            maxHeight: '42px',
                                            '@media screen and (min-width: 768px)':
                                                {
                                                    maxWidth: '210px',
                                                    maxHeight: '52px',
                                                },
                                        },

                                        '& .MuiPickersInputBase-sectionsContainer':
                                            {
                                                fontSize: '14px',
                                                lineHeight: '18px',
                                                letterSpacing: '-0.36px',
                                                color: '#262626',
                                            },
                                        '& .MuiPickersOutlinedInput-root': {
                                            borderColor: '#26262626',
                                            '& fieldset': {
                                                borderColor: '#26262626',
                                                transition:
                                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#F6B83D',
                                            },
                                            '&.Mui-error fieldset': {
                                                borderColor: '#EF2447',
                                            },
                                            '&:hover.Mui-error fieldset': {
                                                borderColor: '#F6B83D',
                                            },
                                        },
                                        '& .MuiPickersOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline':
                                            {
                                                borderColor: '#F6B83D',
                                            },
                                    }}
                                    disableFuture
                                    helperText={errors.birthday?.message}
                                    error={Boolean(errors.birthday)}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="species"
                            defaultValue=""
                            render={({ field }) => (
                                <div className="w-[143px] md:w-[210px]">
                                    <Select
                                        id="demo-simple-select"
                                        displayEmpty
                                        error={Boolean(errors.species)}
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
                                            maxWidth: '143px',
                                            width: '100%',
                                            bgcolor: 'white',
                                            borderColor: '#26262626',
                                            maxHeight: '42px',
                                            borderRadius: '30px',
                                            '@media screen and (min-width: 768px)':
                                                {
                                                    maxHeight: '52px',
                                                    maxWidth: '210px',
                                                },
                                            '&.MuiOutlinedInput-root': {
                                                borderRadius: '30px',
                                                width: '100%',
                                                transition:
                                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                                '& fieldset': {
                                                    borderColor: '#26262626',
                                                    transition:
                                                        'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
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
                                    {Boolean(errors.species) && (
                                        <FormHelperText
                                            className="Mui-error"
                                            sx={{ marginInline: '14px' }}
                                        >
                                            {errors.species?.message}
                                        </FormHelperText>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Link
                        to="/profile"
                        className="cursor-pointer transition-colors hover:bg-[#26262610] rounded-[30px] px-[34px] md:px-[67px] py-[12px] md:py-[14px] text-[#262626] font-bold text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px] bg-[#26262605]"
                    >
                        Back
                    </Link>
                    <button
                        type="submit"
                        className="text-white transition-colors hover:bg-[#F9B020] text-[14px] md:text-[16px] leading-[18px] md:leading-5 tracking-[-0.36px] font-bold rounded-[30px] bg-[#F6B83D] py-[12px] md:py-[14px] px-[26px] md:px-[58px] cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
