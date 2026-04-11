import { createSlice } from '@reduxjs/toolkit';
import type { operationStatus, Pet } from '../../components/App/types';
import {
    getAllNotices,
    getCategories,
    getNoticeById,
    getSex,
    getSpecies,
    type ByIdResponse,
} from './operations';

interface InitialValue {
    notices: Pet[];
    page: number;
    totalPages: number;
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
    operations: {
        allNotices: operationStatus;
        noticeById: operationStatus & { currentId: string | null };
        getCategories: operationStatus;
        getSex: operationStatus;
        getSpecies: operationStatus;
    };
    categories: string[];
    species: string[];
    genders: string[];
}

const initialState: InitialValue = {
    notices: [],
    page: 1,
    totalPages: 0,
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
    operations: {
        allNotices: {
            status: 'idle',
            error: null,
        },
        noticeById: { status: 'idle', error: null, currentId: null },
        getCategories: {
            status: 'idle',
            error: null,
        },
        getSex: {
            status: 'idle',
            error: null,
        },
        getSpecies: {
            status: 'idle',
            error: null,
        },
    },
    categories: [],
    genders: [],
    species: [],
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
            .addCase(getAllNotices.pending, (state) => {
                state.operations.allNotices.status = 'loading';
                state.operations.allNotices.error = null;
            })
            .addCase(getAllNotices.fulfilled, (state, action) => {
                state.notices = action.payload.results;
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.page;
                state.operations.allNotices.status = 'succeeded';
                state.operations.allNotices.error = null;
            })
            .addCase(getAllNotices.rejected, (state, action) => {
                state.operations.allNotices.status = 'failed';
                state.operations.allNotices.error = action.payload ?? null;
            })
            .addCase(getNoticeById.pending, (state, action) => {
                state.operations.noticeById.status = 'loading';
                state.operations.noticeById.currentId = action.meta.arg;
                state.operations.noticeById.error = null;
            })
            .addCase(getNoticeById.fulfilled, (state, action) => {
                state.selectedPet = action.payload.forModal;
                state.operations.noticeById.status = 'succeeded';
                state.operations.noticeById.currentId = null;
                state.operations.noticeById.error = null;
            })
            .addCase(getNoticeById.rejected, (state, action) => {
                state.operations.noticeById.status = 'failed';
                state.operations.noticeById.currentId = null;
                state.operations.noticeById.error = action.payload ?? null;
            })
            .addCase(getCategories.pending, (state) => {
                state.operations.getCategories.status = 'loading';
                state.operations.getCategories.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.operations.getCategories.status = 'succeeded';
                state.operations.getCategories.error = null;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.operations.getCategories.status = 'failed';
                state.operations.getCategories.error = action.payload ?? null;
            })
            .addCase(getSex.pending, (state) => {
                state.operations.getSex.status = 'loading';
                state.operations.getSex.error = null;
            })
            .addCase(getSex.fulfilled, (state, action) => {
                state.genders = action.payload;
                state.operations.getSex.status = 'succeeded';
                state.operations.getSex.error = null;
            })
            .addCase(getSex.rejected, (state, action) => {
                state.operations.getSex.status = 'failed';
                state.operations.getSex.error = action.payload ?? null;
            })
            .addCase(getSpecies.pending, (state) => {
                state.operations.getSpecies.status = 'loading';
                state.operations.getSpecies.error = null;
            })
            .addCase(getSpecies.fulfilled, (state, action) => {
                state.species = action.payload;
                state.operations.getSpecies.status = 'succeeded';
                state.operations.getSpecies.error = null;
            })
            .addCase(getSpecies.rejected, (state, action) => {
                state.operations.getSpecies.status = 'failed';
                state.operations.getSpecies.error = action.payload ?? null;
            });
    },
});

export const { setPage, setFilters } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
