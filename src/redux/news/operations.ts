import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { News } from '../../components/App/types';

export interface NewsResponse {
    page: number;
    perPage: number;
    totalPages: number;
    results: News[];
}

interface NewsPayload {
    keyword: string;
    page?: number;
    limit?: 4 | 6;
}

type ApiError = {
    message: string;
    status?: number;
};

export const getNews = createAsyncThunk<
    NewsResponse,
    NewsPayload,
    { rejectValue: ApiError }
>('news/all', async ({ keyword, page = 1, limit = 6 }, thunkAPI) => {
    try {
        const params: Record<string, string | number> = {};

        if (page !== undefined) params.page = page;
        if (limit !== undefined) params.limit = limit;
        if (keyword) params.keyword = keyword;
        const response = await axios.get('/news', { params });

        return response.data;
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
