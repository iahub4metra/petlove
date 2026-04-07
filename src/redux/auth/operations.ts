import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { FullUser } from '../../components/App/types';
import type { FormValues as UserEditCredentials } from '../../components/ModalEditUser/ModalEditUser';
import type { FormValues } from '../../components/AddPetForm/AddPetForm';

interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}

type ImmutablePayload = 'name';

type SignInPayload = Omit<SignUpPayload, ImmutablePayload>;

interface SignResponse {
    name: string;
    email: string;
    token: string;
}

type CurrentFullResponse = FullUser;

type ApiError = {
    message: string;
    status?: number;
};

axios.defaults.baseURL = 'https://petlove.b.goit.study/api';

export const signUp = createAsyncThunk<
    SignResponse,
    SignUpPayload,
    { rejectValue: ApiError }
>('auth/signUp', async (userCredentials, thunkAPI) => {
    try {
        const data = await axios.post('/users/signup', userCredentials);
        localStorage.setItem('token', data.data.token);

        return data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
            });
        }

        return thunkAPI.rejectWithValue({
            message: 'Unknown error',
        });
    }
});

export const signIn = createAsyncThunk<
    SignResponse,
    SignInPayload,
    { rejectValue: ApiError }
>('auth/signin', async (userCredentials, thunkAPI) => {
    try {
        const data = await axios.post('users/signin', userCredentials);
        localStorage.setItem('token', data.data.token);
        return data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
            });
        }

        return thunkAPI.rejectWithValue({
            message: 'Unknown error',
        });
    }
});

export const signOut = createAsyncThunk<
    void,
    string | null,
    { rejectValue: ApiError }
>('auth/signout', async (token, thunkAPI) => {
    try {
        await axios.post(
            'users/signout',
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        localStorage.removeItem('token');
    } catch (error) {
        localStorage.removeItem('token');
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
            });
        }

        return thunkAPI.rejectWithValue({
            message: 'Unknown error',
        });
    }
});

// export const getCurrentUser = createAsyncThunk<CurrentResponse, string>(
//     'auth/current',
//     async (token, thunkAPI) => {
//         try {
//             const data = await axios.get('users/current', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return data.data;
//         } catch (error) {
//             let message = 'Unknown error';

//             if (error instanceof Error) {
//                 message = error.message;
//             }

//             return thunkAPI.rejectWithValue(message);
//         }
//     },
// );

export const getCurrentUserFull = createAsyncThunk<CurrentFullResponse, string>(
    'auth/current/full',
    async (token, thunkAPI) => {
        try {
            const data = await axios.get('users/current/full', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const editUser = createAsyncThunk<
    CurrentFullResponse,
    UserEditCredentials
>('auth/current/edit', async (userCredentials, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const data = await axios.patch('users/current/edit', userCredentials, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.data;
    } catch (error) {
        let message = 'Unknown error';

        if (error instanceof Error) {
            message = error.message;
        }

        return thunkAPI.rejectWithValue(message);
    }
});

export const addPet = createAsyncThunk<
    CurrentFullResponse,
    FormValues,
    { rejectValue: ApiError }
>('auth/current/pets/add', async (petInfo, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const data = await axios.post('users/current/pets/add', petInfo, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
            });
        }

        return thunkAPI.rejectWithValue({
            message: 'Unknown error',
        });
    }
});

export const removePet = createAsyncThunk<CurrentFullResponse, string>(
    'auth/current/pets/remove',
    async (petId, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const data = await axios.delete(
                `users/current/pets/remove/${petId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            return data.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);
