import { FormControl, MenuItem, Select } from '@mui/material';
import AsyncSelect from 'react-select/async';
import { setFilters } from '../../redux/notices/slice';
import SearchField from '../SearchField/SearchField';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCategories,
    getLocation,
    getSex,
    getSpecies,
} from '../../redux/notices/operations';
import { useEffect, useState } from 'react';
import { selectFilters } from '../../redux/notices/selectors';
import { useForm } from 'react-hook-form';
import type { Location } from '../App/types';

export interface Filters {
    keyword: string;
    category?: string;
    sex?: string;
    species?: string;
    locationId?: string;
    byDate?: boolean;
    byPrice?: boolean;
    byPopularity?: boolean;
}

export interface FormValues {
    keyword: string;
    category?: string;
    sex?: string;
    species?: string;
    locationId?: string;
    byDate?: boolean;
    byPrice?: boolean;
    byPopularity?: boolean;
}
type OptionType = { value: string; label: string };

export default function NoticesFilters() {
    const dispatch: AppDispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>();
    const [genders, setGender] = useState<string[]>();
    const [species, setSpecies] = useState<string[]>();
    const [locations, setLocations] = useState<OptionType[]>();
    const filters = useSelector(selectFilters);

    const { register, handleSubmit, watch, reset } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        dispatch(setFilters(data));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await dispatch(getCategories()).unwrap();
                setCategories(result);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, [dispatch]);

    useEffect(() => {
        const fetchGender = async () => {
            try {
                const result = await dispatch(getSex()).unwrap();
                setGender(result);
            } catch (err) {
                console.error('Failed to fetch genders:', err);
            }
        };
        fetchGender();
    }, [dispatch]);

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

    const loadLocations = async (inputValue: string) => {
        if (inputValue.length < 3) {
            return [];
        }
        try {
            const result: Location[] = await dispatch(
                getLocation(inputValue),
            ).unwrap();
            const options: OptionType[] = result.map((city) => ({
                value: city._id,
                label: `${city.stateEn}, ${city.cityEn}`,
            }));
            setLocations(options);
            return options;
        } catch (err) {
            console.error('Failed to fetch species:', err);
            return [];
        }
    };

    return (
        <div className="bg-[#FFF4DF] rounded-[30px] p-[20px] mb-10 md:mb-8 xl:mb-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative md:flex md:flex-wrap md:gap-4"
            >
                <SearchField
                    action={setFilters}
                    formRegister={register('keyword')}
                    watch={watch}
                    reset={reset}
                    actionClear={setFilters({ ...filters, keyword: '' })}
                />
                <div className="flex gap-2 md:gap-4">
                    <FormControl
                        sx={{
                            flex: '1 1 143px',
                            maxWidth: '170px',
                            marginTop: '12px',
                            '@media screen and (min-width: 768px)': {
                                marginTop: '0',
                                width: '170px',
                            },
                        }}
                    >
                        <Select
                            id="demo-simple-select"
                            displayEmpty
                            {...register('category')}
                            value={filters.category ?? ''}
                            onChange={(e) => {
                                const value =
                                    e.target.value === 'Show all'
                                        ? ''
                                        : e.target.value;
                                dispatch(
                                    setFilters({
                                        ...filters,
                                        category: value,
                                    }),
                                );
                            }}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return (
                                        <span className="text-[#262626] text-[14px] font-medium leading-[18px] tracking-[-0.42px] md:text-[16px] md:leading-5 md:tracking-[-0.48px] font-[Manrope]">
                                            Category
                                        </span>
                                    );
                                }
                                return (
                                    selected.charAt(0).toUpperCase() +
                                    selected.slice(1)
                                );
                            }}
                            sx={{
                                width: '100%',
                                bgcolor: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '& .MuiSelect-select': {
                                    padding: '12px',
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
                                    },
                                },
                            }}
                        >
                            <MenuItem
                                value="Show all"
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
                                    '&:focus': {
                                        bgcolor: 'transparent',
                                    },
                                    '@media screen and (min-width: 768px)': {
                                        font: '500 16px/20px "Manrope", sans-serif',
                                        letterSpacing: '-0.48px',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'transparent',
                                        color: '#F6B83D',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                        },
                                    },
                                }}
                            >
                                Show all
                            </MenuItem>
                            {categories?.map((category) => (
                                <MenuItem
                                    key={category}
                                    value={category}
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
                                                letterSpacing: '-0.48px',
                                            },
                                        '&.Mui-selected': {
                                            bgcolor: 'transparent',
                                            color: '#F6B83D',
                                            '&:hover': {
                                                bgcolor: 'transparent',
                                            },
                                        },
                                    }}
                                >
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        sx={{
                            flex: '1 1 143px',
                            maxWidth: '170px',
                            marginTop: '12px',
                            '@media screen and (min-width: 768px)': {
                                marginTop: '0',
                                width: '170px',
                            },
                        }}
                    >
                        <Select
                            id="demo-simple-select"
                            displayEmpty
                            {...register('sex')}
                            value={filters.sex ?? ''}
                            onChange={(e) => {
                                const value =
                                    e.target.value === 'Show all'
                                        ? ''
                                        : e.target.value;
                                dispatch(
                                    setFilters({
                                        ...filters,
                                        sex: value,
                                    }),
                                );
                            }}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return (
                                        <span className="text-[#262626] text-[14px] font-medium leading-[18px] tracking-[-0.42px] md:text-[16px] md:leading-5 md:tracking-[-0.48px] font-[Manrope]">
                                            By gender
                                        </span>
                                    );
                                }
                                return (
                                    selected.charAt(0).toUpperCase() +
                                    selected.slice(1)
                                );
                            }}
                            sx={{
                                width: '100%',
                                bgcolor: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '& .MuiSelect-select': {
                                    padding: '12px',
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
                                    },
                                },
                            }}
                        >
                            <MenuItem
                                value="Show all"
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
                                    '&:focus': {
                                        bgcolor: 'transparent',
                                    },
                                    '@media screen and (min-width: 768px)': {
                                        font: '500 16px/20px "Manrope", sans-serif',
                                        letterSpacing: '-0.48px',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'transparent',
                                        color: '#F6B83D',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                        },
                                    },
                                }}
                            >
                                Show all
                            </MenuItem>
                            {genders?.map((gender) => (
                                <MenuItem
                                    key={gender}
                                    value={gender}
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
                                                letterSpacing: '-0.48px',
                                            },
                                        '&.Mui-selected': {
                                            bgcolor: 'transparent',
                                            color: '#F6B83D',
                                            '&:hover': {
                                                bgcolor: 'transparent',
                                            },
                                        },
                                    }}
                                >
                                    {gender.charAt(0).toUpperCase() +
                                        gender.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl
                        sx={{
                            width: '100%',
                            maxWidth: '295px',
                            marginTop: '12px',
                            '@media screen and (min-width: 768px)': {
                                marginTop: '0',
                                width: '190px',
                            },
                        }}
                    >
                        <Select
                            id="demo-simple-select"
                            displayEmpty
                            {...register('species')}
                            value={filters.species ?? ''}
                            onChange={(e) => {
                                const value =
                                    e.target.value === 'Show all'
                                        ? ''
                                        : e.target.value;
                                dispatch(
                                    setFilters({
                                        ...filters,
                                        species: value,
                                    }),
                                );
                            }}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return (
                                        <span className="text-[#262626] text-[14px] font-medium leading-[18px] tracking-[-0.42px] md:text-[16px] md:leading-5 md:tracking-[-0.48px] font-[Manrope]">
                                            By type
                                        </span>
                                    );
                                }
                                return (
                                    selected.charAt(0).toUpperCase() +
                                    selected.slice(1)
                                );
                            }}
                            sx={{
                                width: '100%',
                                bgcolor: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '& .MuiSelect-select': {
                                    padding: '12px',
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
                                        maxHeight: '215px',
                                        overflowY: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '8px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            bgcolor: '#26262614',
                                            borderRadius: '13px',
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem
                                value="Show all"
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
                                    '&:focus': {
                                        bgcolor: 'transparent',
                                    },
                                    '@media screen and (min-width: 768px)': {
                                        font: '500 16px/20px "Manrope", sans-serif',
                                        letterSpacing: '-0.48px',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'transparent',
                                        color: '#F6B83D',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                        },
                                    },
                                }}
                            >
                                Show all
                            </MenuItem>
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
                                                letterSpacing: '-0.48px',
                                            },
                                        '&.Mui-selected': {
                                            bgcolor: 'transparent',
                                            color: '#F6B83D',
                                            '&:hover': {
                                                bgcolor: 'transparent',
                                            },
                                        },
                                    }}
                                >
                                    {type.charAt(0).toUpperCase() +
                                        type.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <AsyncSelect
                        {...register('locationId')}
                        isClearable
                        isSearchable
                        name="location"
                        placeholder="Location"
                        loadOptions={loadLocations}
                        defaultOptions={locations}
                        onChange={(option) =>
                            dispatch(
                                setFilters({
                                    ...filters,
                                    locationId: option?.value,
                                }),
                            )
                        }
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                marginTop: '12px',
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                alignItems: 'start',
                                padding: '12px',
                                height: '48px',
                                boxShadow: state.isFocused
                                    ? '#F6B83D'
                                    : base.boxShadow,
                                '&:hover': {
                                    cursor: 'pointer',
                                    border: '1px solid #F6B83D',
                                    boxShadow: 'none',
                                },
                                '@media screen and (min-width: 768px)': {
                                    width: '227px',
                                    marginTop: '0',
                                },
                            }),

                            placeholder: (base, state) => ({
                                ...base,
                                display: state.isFocused ? 'none' : 'block',
                                color: '#262626',
                                margin: 0,
                                fontSize: '14px',
                                lineHeight: '18px',
                                letterSpacing: '-0.42px',
                                fontWeight: '500',
                                '@media and screen (min-width: 768px)': {
                                    fontSize: '16px',
                                    lineHeight: '20px',
                                    letterSpacing: '-0.48px',
                                },
                            }),

                            input: (base) => ({
                                ...base,
                                maxHeight: '18px',
                            }),

                            indicatorsContainer: () => ({
                                display: 'flex',
                                div: {
                                    padding: '0',
                                },
                            }),

                            indicatorSeparator: () => ({
                                display: 'none',
                            }),

                            valueContainer: (base) => ({
                                ...base,
                                padding: '2px',
                            }),

                            singleValue: (base) => ({
                                ...base,
                                margin: 0,
                            }),

                            menu: (base) => ({
                                ...base,
                                marginTop: '4px',
                                borderRadius: '15px',
                                boxShadow: 'none',
                                backgroundColor: '#ffffff',
                                padding: '12px',
                                overflowY: 'auto',
                                left: '0',
                                marginBottom: 0,
                            }),

                            menuList: (base) => ({
                                ...base,
                                padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0,
                                maxHeight: '150px',

                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(38, 38, 38, 0.08)',
                                    borderRadius: '13px',
                                },
                            }),

                            option: (base, state) => ({
                                ...base,
                                padding: '0.25rem 0',
                                color: state.isSelected
                                    ? '#262626'
                                    : 'rgba(38, 38, 38, 0.6)',
                                textTransform: 'capitalize',
                                backgroundColor: 'transparent',
                                minHeight: 'unset',
                                transition: 'color 0.15s',

                                mark: {
                                    transition: 'color 0.15s',
                                },

                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#262626 !important',
                                    cursor: 'pointer',
                                    mark: {
                                        color: '#262626',
                                    },
                                },
                                '&:focus': {
                                    backgroundColor: 'transparent',
                                    color: '#262626',
                                    mark: {
                                        color: '#262626',
                                    },
                                },
                                '&:first-of-type': {
                                    paddingTop: 0,
                                },
                                '&:last-of-type': {
                                    paddingBottom: 0,
                                },
                            }),
                        }}
                    />
                </div>
                <div className="border-t-[#26262610] pt-4 border-t mt-4 md:mt-0 w-full">
                    <div className="flex gap-[10px] items-center flex-wrap">
                        <label className="relative w-fit">
                            <input
                                type="radio"
                                name="radioFilter"
                                onChange={() =>
                                    dispatch(
                                        setFilters({
                                            ...filters,
                                            byPopularity: 0,
                                            byPrice: null,
                                            byDate: null,
                                        }),
                                    )
                                }
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer"
                            />
                            <p className="leading-[18px] font-[14px] text-[#262626] p-2.5 md:p-3 bg-white rounded-[30px] peer-checked:bg-[#F6B83D] peer-checked:text-white">
                                Popular
                            </p>
                        </label>
                        <label className="relative w-fit">
                            <input
                                type="radio"
                                name="radioFilter"
                                onChange={() =>
                                    dispatch(
                                        setFilters({
                                            ...filters,
                                            byPopularity: 1,
                                            byPrice: null,
                                            byDate: null,
                                        }),
                                    )
                                }
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer"
                            />
                            <p className="leading-[18px] font-[14px] text-[#262626] p-2.5 md:p-3 bg-white rounded-[30px] peer-checked:bg-[#F6B83D] peer-checked:text-white">
                                Unpopular
                            </p>
                        </label>
                        <label className="relative w-fit">
                            <input
                                type="radio"
                                name="radioFilter"
                                onChange={() =>
                                    dispatch(
                                        setFilters({
                                            ...filters,
                                            byPrice: 0,
                                            byPopularity: null,
                                            byDate: null,
                                        }),
                                    )
                                }
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer"
                            />
                            <p className="leading-[18px] font-[14px] text-[#262626] p-2.5 md:p-3 bg-white rounded-[30px] peer-checked:bg-[#F6B83D] peer-checked:text-white">
                                Expensive
                            </p>
                        </label>
                        <label className="relative w-fit">
                            <input
                                type="radio"
                                name="radioFilter"
                                onChange={() =>
                                    dispatch(
                                        setFilters({
                                            ...filters,
                                            byPrice: 1,
                                            byPopularity: null,
                                            byDate: null,
                                        }),
                                    )
                                }
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer"
                            />
                            <p className="leading-[18px] font-[14px] text-[#262626] p-2.5 md:p-3 bg-white rounded-[30px] peer-checked:bg-[#F6B83D] peer-checked:text-white">
                                Cheap
                            </p>
                        </label>
                        <label className="relative w-fit">
                            <input
                                type="radio"
                                name="radioFilter"
                                onChange={() =>
                                    dispatch(
                                        setFilters({
                                            ...filters,
                                            byDate: 0,
                                            byPopularity: null,
                                            byPrice: null,
                                        }),
                                    )
                                }
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer"
                            />
                            <p className="leading-[18px] font-[14px] text-[#262626] p-2.5 md:p-3 bg-white rounded-[30px] peer-checked:bg-[#F6B83D] peer-checked:text-white">
                                Newest
                            </p>
                        </label>
                        <label className="relative w-fit">
                            <input
                                type="radio"
                                name="radioFilter"
                                onChange={() =>
                                    dispatch(
                                        setFilters({
                                            ...filters,
                                            byDate: 1,
                                            byPopularity: null,
                                            byPrice: null,
                                        }),
                                    )
                                }
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer peer"
                            />
                            <p className="leading-[18px] font-[14px] text-[#262626] p-2.5 md:p-3 bg-white rounded-[30px] peer-checked:bg-[#F6B83D] peer-checked:text-white">
                                Oldest
                            </p>
                        </label>
                    </div>
                </div>

                <button
                    type="button"
                    className="p-2.5 md:p-3 rounded-[30px] bg-[#F6B83D] hover:bg-[F9B020] text-white transition-all active:scale-[105%] mt-3 md:mt-0 md:absolute bottom-0 right-0 cursor-pointer"
                    onClick={() => {
                        dispatch(
                            setFilters({
                                keyword: '',
                                category: '',
                                sex: '',
                                species: '',
                                locationId: '',
                                byDate: null,
                                byPopularity: null,
                                byPrice: null,
                            }),
                        );
                        reset();
                    }}
                >
                    Reset
                </button>
            </form>
        </div>
    );
}
