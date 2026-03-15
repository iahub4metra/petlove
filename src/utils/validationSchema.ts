import * as yup from 'yup';

const emailExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const phoneExp = /^\+\d{5,15}$/;
const avatarExp = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;

export const registrationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup
        .string()
        .email('Enter a valid Email')
        .matches(emailExp, 'Enter a valid Email')
        .required('Email is required'),
    password: yup
        .string()
        .min(7, 'Password must be at least 7 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Паролі не співпадають')
        .required(),
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid Email')
        .matches(emailExp, 'Enter a valid Email')
        .required('Email is required'),
    password: yup
        .string()
        .min(7, 'Password must be at least 7 characters')
        .required('Password is required'),
});

export const editUserSchema = yup.object({
    name: yup.string().required(),
    email: yup
        .string()
        .email('Enter a valid email')
        .matches(emailExp, 'Enter a valid email')
        .required(),
    avatar: yup.string().matches(avatarExp, 'Enter a valid URL').required(),
    phone: yup
        .string()
        .matches(phoneExp, 'Enter a valid phone number')
        .required(),
});

export const addPetSchema = yup.object({
    title: yup.string().required('Title is required'),
    name: yup.string().required('Name is required'),
    species: yup.string().required('Select species'),
    sex: yup.string().required('Select sex'),
    imgUrl: yup.string().matches(avatarExp, 'Enter a valid URL').required(),
    birthday: yup
        .string()
        .matches(/^d{4}-d{2}-d{2}$/, 'Enter a valid Date')
        .required('Birthday date is required'),
});
