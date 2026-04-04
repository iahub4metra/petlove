import { createSlice } from '@reduxjs/toolkit';
import type { Friends } from '../../components/App/types';
import { getFriends } from './operations';

interface InitialValue {
    items: Friends[];
    operations: {
        friends: {
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: {
                message: string;
                status?: number;
            } | null;
        };
    };
}

const initialState: InitialValue = {
    items: [],
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
                state.operations.friends.status = 'loading';
                state.operations.friends.error = null;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.items = action.payload;
                state.operations.friends.status = 'succeeded';
                state.operations.friends.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.operations.friends.status = 'failed';
                state.operations.friends.error = action.payload ?? null;
            });
    },
});

export const friendsReducer = friendsSlice.reducer;
