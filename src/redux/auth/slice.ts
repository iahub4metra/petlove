import { createSlice } from '@reduxjs/toolkit';
import type { BaseUser, FullUser } from '../../components/App/types';
import {
    editUser,
    getCurrentUserFull,
    signIn,
    signOut,
    signUp,
} from './operations';
import {
    addNoticeToFavourite,
    removeNoticeFromFavourite,
} from '../notices/operations';

type RejectedAction = {
    type: string;
    error: {
        message?: string;
    };
};

interface InitialValue {
    user: BaseUser | FullUser | null;
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
            .addCase(editUser.rejected, handleRejected)
            .addCase(addNoticeToFavourite.pending, handlePending)
            .addCase(addNoticeToFavourite.fulfilled, (state, action) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.user.noticesFavorites.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(addNoticeToFavourite.rejected, handleRejected)
            .addCase(removeNoticeFromFavourite.pending, handlePending)
            .addCase(removeNoticeFromFavourite.fulfilled, (state, action) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.user.noticesFavorites =
                        state.user.noticesFavorites.filter(
                            (notice) => notice._id !== action.payload._id,
                        );
                }
                state.loading = false;
            })
            .addCase(removeNoticeFromFavourite.rejected, handleRejected);
    },
});

export const authReducer = authSlice.reducer;
