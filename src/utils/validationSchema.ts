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
