import { createSlice } from '@reduxjs/toolkit';
import type { News } from '../../components/App/types';
import { getNews } from './operations';

interface InitialValue {
    news: News[];
    page: number;
    totalPages: number;
    keyword: string;
    loading: boolean;
    operations: {
        news: {
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: {
                message: string;
                status?: number;
            } | null;
        };
    };
}

const initialState: InitialValue = {
    news: [],
    page: 1,
    keyword: '',
    totalPages: 0,
    loading: false,
    operations: {
        news: {
            status: 'idle',
            error: null,
        },
    },
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.operations.news.status = 'loading';
                state.operations.news.error = null;
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.news = action.payload.results;
                state.operations.news.status = 'succeeded';
                state.keyword = action.meta.arg.keyword;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getNews.rejected, (state, action) => {
                state.operations.news.error = action.payload ?? null;
                state.operations.news.status = 'failed';
            });
    },
});

export const { setPage, setKeyword } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
