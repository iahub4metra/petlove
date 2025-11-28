import { createSlice } from '@reduxjs/toolkit';
import type { Pet } from '../../components/App/types';
import { getAllNotices, getNoticeById, type ByIdResponse } from './operations';

interface InitialValue {
    notices: Pet[];
    page: number;
    totalPages: number;
    loading: boolean;
    selectedPet: ByIdResponse | null;
    filters: {
        keyword: string;
        category: string;
        sex: string;
        species: string;
        locationId: string;
        byDate: boolean | null;
        byPrice: boolean | null;
        byPopularity: boolean | null;
    };
}

const initialState: InitialValue = {
    notices: [],
    page: 1,
    totalPages: 0,
    loading: false,
    selectedPet: null,
    filters: {
        keyword: '',
        category: '',
        sex: '',
        species: '',
        locationId: '',
        byDate: null,
        byPopularity: null,
        byPrice: null,
    },
};

const handlePending = (state: InitialValue) => {
    state.loading = true;
};

const handleRejected = (state: InitialValue) => {
    state.loading = false;
};

const noticesSlice = createSlice({
    name: 'notices',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotices.pending, handlePending)
            .addCase(getAllNotices.fulfilled, (state, action) => {
                state.notices = action.payload.results;
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.page;
                state.loading = false;
            })
            .addCase(getAllNotices.rejected, handleRejected)
            .addCase(getNoticeById.pending, handlePending)
            .addCase(getNoticeById.fulfilled, (state, action) => {
                state.selectedPet = action.payload;
                state.loading = false;
            })
            .addCase(getNoticeById.rejected, handleRejected);
    },
});

export const { setPage, setFilters } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
