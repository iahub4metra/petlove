import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Location, Pet } from '../../components/App/types';

interface AllResponse {
    page: number;
    perPage: number;
    totalPages: number;
    results: Pet[];
}

interface AllPayload {
    page?: number;
    filters?: {
        keyword?: string;
        category?: string;
        sex?: string;
        species?: string;
        locationId?: string;
    };
}

export type ByIdResponse = Pet & {
    location: {
        _id: string;
        stateEn: string;
        cityEn: string;
    };
    user: {
        _id: string;
        email: string;
        phone: string;
    };
};

export const getAllNotices = createAsyncThunk<AllResponse, AllPayload>(
    'notices/all',
    async ({ page, filters }, thunkAPI) => {
        try {
            const response = await axios.get('/notices', {
                params: { page, ...filters },
            });
            return response.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const getNoticeById = createAsyncThunk<ByIdResponse, string>(
    'notices/byId',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`notices/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const getCategories = createAsyncThunk<string[]>(
    'notices/categories',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('notices/categories');
            return response.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const getSex = createAsyncThunk<string[]>(
    'notices/sex',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('notices/sex');
            return response.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const getSpecies = createAsyncThunk<string[]>(
    'notices/species',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('notices/species');
            return response.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const getLocation = createAsyncThunk<Location[], string>(
    'cities',
    async (keyword, thunkAPI) => {
        try {
            const response = await axios.get('cities', {
                params: { keyword: keyword },
            });
            return response.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const addNoticeToFavourite = createAsyncThunk<
    Pet,
    { notice: Pet; userID: string | undefined }
>('notices/favorites/add', async (credentials, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(
            `notices/favorites/add/${credentials.notice._id}`,
            credentials.userID,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        return credentials.notice;
    } catch (error) {
        let message = 'Unknown error';

        if (error instanceof Error) {
            message = error.message;
        }

        return thunkAPI.rejectWithValue(message);
    }
});

export const removeNoticeFromFavourite = createAsyncThunk<string, Pet>(
    'notices/favorites/remove',
    async (notice, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`notices/favorites/remove/${notice._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return notice._id;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);
