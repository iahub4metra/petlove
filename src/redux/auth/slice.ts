import { createSlice } from '@reduxjs/toolkit';
import type { BaseUser, FullUser, MidUser } from '../../components/App/types';
import {
    editUser,
    getCurrentUserFull,
    signIn,
    signOut,
    signUp,
} from './operations';

type RejectedAction = {
    type: string;
    error: {
        message?: string;
    };
};

interface InitialValue {
    user: BaseUser | MidUser | FullUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: InitialValue = {
    user: null,
    loading: false,
    error: null,
};

const handlePending = (state: InitialValue) => {
    state.loading = true;
    state.error = null;
};

const handleRejected = (state: InitialValue, action: RejectedAction) => {
    state.loading = false;
    state.error = action.error.message || 'Unknown error';
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, handlePending)
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signUp.rejected, handleRejected)
            .addCase(signIn.pending, handlePending)
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signIn.rejected, handleRejected)
            .addCase(signOut.pending, handlePending)
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(signOut.rejected, handleRejected)
            .addCase(getCurrentUserFull.pending, handlePending)
            .addCase(getCurrentUserFull.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getCurrentUserFull.rejected, handleRejected)
            .addCase(editUser.pending, handlePending)
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(editUser.rejected, handleRejected);
    },
});

export const authReducer = authSlice.reducer;
