import { createSlice } from '@reduxjs/toolkit';
import type {
    BaseUser,
    FullUser,
    operationStatus,
} from '../../components/App/types';
import {
    addPet,
    editUser,
    getCurrentUserFull,
    removePet,
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
    operations: {
        signIn: operationStatus;
        signUp: operationStatus;
        signOut: operationStatus;
        addPet: operationStatus;
    };
}

const handlePending = (state: InitialValue) => {
    state.loading = true;
    state.error = null;
};

const handleRejected = (state: InitialValue, action: RejectedAction) => {
    state.loading = false;
    state.error = action.error.message || 'Unknown error';
};

const initialState: InitialValue = {
    user: null,
    loading: false,
    error: null,
    favCountBeforeAdding: 0,
    showPopUpFirstFav: false,
    operations: {
        signIn: {
            status: 'idle',
            error: null,
        },
        signUp: {
            status: 'idle',
            error: null,
        },
        signOut: {
            status: 'idle',
            error: null,
        },
        addPet: {
            status: 'idle',
            error: null,
        },
    },
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
            .addCase(signUp.pending, (state) => {
                state.operations.signUp.status = 'loading';
                state.operations.signUp.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.operations.signUp.status = 'succeeded';
                state.operations.signUp.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.operations.signUp.status = 'failed';
                state.operations.signUp.error = action.payload ?? null;
            })
            .addCase(signIn.pending, (state) => {
                state.operations.signIn.status = 'loading';
                state.operations.signIn.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload;
                state.operations.signIn.status = 'succeeded';
                state.operations.signIn.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.operations.signIn.status = 'failed';
                state.operations.signIn.error = action.payload ?? null;
            })
            .addCase(signOut.pending, (state) => {
                state.operations.signOut.status = 'loading';
                state.operations.signOut.error = null;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
                state.operations.signOut.status = 'succeeded';
                state.operations.signOut.error = null;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.user = null;
                state.operations.signOut.status = 'failed';
                state.operations.signOut.error = action.payload ?? null;
            })
            .addCase(getCurrentUserFull.pending, handlePending)
            .addCase(getCurrentUserFull.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getCurrentUserFull.rejected, handleRejected)
            .addCase(editUser.pending, handlePending)
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(editUser.rejected, handleRejected)
            .addCase(addNoticeToFavourite.pending, (state) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.favCountBeforeAdding =
                        state.user.noticesFavorites.length;
                }
                state.error = null;
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
                    const exists = state.user.noticesViewed.some(
                        (notice) => notice._id === action.payload.forList._id,
                    );

                    if (!exists) {
                        state.user.noticesViewed.push(action.payload.forList);
                    }
                }
            })
            .addCase(addPet.pending, (state) => {
                state.operations.addPet.status = 'loading';
                state.operations.addPet.error = null;
            })
            .addCase(addPet.rejected, (state, action) => {
                state.operations.addPet.status = 'failed';
                state.operations.addPet.error = action.payload ?? null;
            })
            .addCase(addPet.fulfilled, (state, action) => {
                if (state.user && 'pets' in state.user) {
                    state.user.pets = action.payload.pets;
                    state.operations.addPet.status = 'succeeded';
                    state.operations.addPet.error = null;
                }
            })
            .addCase(removePet.pending, handlePending)
            .addCase(removePet.rejected, handleRejected)
            .addCase(removePet.fulfilled, (state, action) => {
                if (state.user && 'pets' in state.user) {
                    state.user.pets = action.payload.pets;
                }
            });
    },
});

export const { hidePopup } = authSlice.actions;

export const authReducer = authSlice.reducer;
