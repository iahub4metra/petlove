import { createSlice } from '@reduxjs/toolkit';
import type { News } from '../../components/App/types';
import { getNews } from './operations';

interface InitialValue {
    news: News[];
    page: number;
    totalPages: number;
    keyword: string;
    loading: boolean;
}

const initialState: InitialValue = {
    news: [],
    page: 1,
    keyword: '',
    totalPages: 0,
    loading: false,
};

const handlePending = (state: InitialValue) => {
    state.loading = true;
};

const handleRejected = (state: InitialValue) => {
    state.loading = false;
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
            .addCase(getNews.pending, handlePending)
            .addCase(getNews.fulfilled, (state, action) => {
                state.news = action.payload.results;
                state.loading = false;
                state.keyword = action.meta.arg.keyword;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getNews.rejected, handleRejected);
    },
});

export const { setPage, setKeyword } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
