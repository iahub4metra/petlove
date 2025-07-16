import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Pet } from '../../components/App/types';

interface AllResponse {
    page: number;
    perPage: number;
    totalPages: number;
    results: Pet[];
}

interface AllPayload {
    page?: number;
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
    async ({ page }, thunkAPI) => {
        try {
            const response = await axios.get('/notices', { params: { page } });
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
