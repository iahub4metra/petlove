import { createSlice } from '@reduxjs/toolkit';
import type { Friends } from '../../components/App/types';
import { getFriends } from './operations';

interface InitialValue {
    items: Friends[];
    loading: boolean;
    error: boolean;
}

const initialState: InitialValue = {
    items: [],
    loading: false,
    error: false,
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
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.items = action.payload;
            })
            .addCase(getFriends.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const friendsReducer = friendsSlice.reducer;
