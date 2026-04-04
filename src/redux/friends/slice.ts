import { createSlice } from '@reduxjs/toolkit';
import type { Friends } from '../../components/App/types';
import { getFriends } from './operations';

interface InitialValue {
    items: Friends[];
    loading: boolean;
    error: boolean;
    operations: {
        friends: {
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: {
                message: string;
                status?: number;
            } | null;
        };
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialValue = {
    items: [],
    loading: false,
    error: false,
    status: 'idle',
    operations: {
        friends: {
            status: 'idle',
            error: null,
        },
    },
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriends.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.status = 'loading';
                state.operations.friends.status = 'loading';
                state.operations.friends.error = null;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.status = 'succeeded';
                state.items = action.payload;
                state.operations.friends.status = 'succeeded';
                state.operations.friends.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
                state.status = 'failed';
                state.operations.friends.status = 'failed';
                state.operations.friends.error = action.payload ?? null;
            });
    },
});

export const friendsReducer = friendsSlice.reducer;
