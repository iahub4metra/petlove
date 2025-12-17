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
    getNoticeById,
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
    favCountBeforeAdding: number;
    showPopUpFirstFav: boolean;
}

const initialState: InitialValue = {
    user: null,
    loading: false,
    error: null,
    favCountBeforeAdding: 0,
    showPopUpFirstFav: false,
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
    reducers: {
        hidePopup: (state, action) => {
            state.showPopUpFirstFav = action.payload;
        },
    },
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
            .addCase(addNoticeToFavourite.pending, (state) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.favCountBeforeAdding =
                        state.user.noticesFavorites.length;
                }
                state.error = null;
                state.loading = false;
            })
            .addCase(addNoticeToFavourite.fulfilled, (state, action) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.user.noticesFavorites.push(action.payload);
                }
                if (
                    state.user &&
                    'noticesFavorites' in state.user &&
                    state.favCountBeforeAdding === 0 &&
                    state.user.noticesFavorites.length === 1
                ) {
                    state.showPopUpFirstFav = true;
                }
                state.loading = false;
            })
            .addCase(addNoticeToFavourite.rejected, handleRejected)
            .addCase(removeNoticeFromFavourite.pending, handlePending)
            .addCase(removeNoticeFromFavourite.fulfilled, (state, action) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.user.noticesFavorites =
                        state.user.noticesFavorites.filter(
                            (notice) => notice._id !== action.payload,
                        );
                }
                state.loading = false;
            })
            .addCase(removeNoticeFromFavourite.rejected, handleRejected)
            .addCase(getNoticeById.fulfilled, (state, action) => {
                if (state.user && 'noticesViewed' in state.user) {
                    state.user.noticesViewed.push(action.payload.forList);
                }
            });
    },
});

export const { hidePopup } = authSlice.actions;

export const authReducer = authSlice.reducer;
