import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { MidUser } from '../../components/App/types';

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

type CurrentResponse = MidUser;

axios.defaults.baseURL = 'https://petlove.b.goit.study/api';

export const signUp = createAsyncThunk<SignResponse, SignUpPayload>(
    'auth/signUp',
    async (userCredentials, thunkAPI) => {
        try {
            const data = await axios.post('/users/signup', userCredentials);
            localStorage.setItem('token', data.data.token);

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

export const signIn = createAsyncThunk<SignResponse, SignInPayload>(
    'auth/signin',
    async (userCredentials, thunkAPI) => {
        try {
            const data = await axios.post('users/signin', userCredentials);
            localStorage.setItem('token', data.data.token);
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

export const signOut = createAsyncThunk<void, string | null>(
    'auth/signout',
    async (token, thunkAPI) => {
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
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const getCurrentUser = createAsyncThunk<CurrentResponse, string>(
    'auth/current',
    async (token, thunkAPI) => {
        try {
            const data = await axios.get('users/current', {
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
