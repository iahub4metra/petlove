import { createSlice } from '@reduxjs/toolkit';
import type { operationStatus, Pet } from '../../components/App/types';
import { getAllNotices, getNoticeById, type ByIdResponse } from './operations';

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
    };
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
    },
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
            });
    },
});

export const { setPage, setFilters } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
