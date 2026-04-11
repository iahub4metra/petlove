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

interface InitialValue {
    user: BaseUser | FullUser | null;
    favCountBeforeAdding: number;
    showPopUpFirstFav: boolean;
    operations: {
        signIn: operationStatus;
        signUp: operationStatus;
        signOut: operationStatus;
        addPet: operationStatus;
        removePet: operationStatus & { currentId: string | null };
        addFav: operationStatus & { currentId: string | null };
        removeFav: operationStatus & { currentId: string | null };
        editUser: operationStatus;
        currentUser: operationStatus;
    };
}

const initialState: InitialValue = {
    user: null,
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
        currentUser: {
            status: 'idle',
            error: null,
        },
        addPet: {
            status: 'idle',
            error: null,
        },
        removePet: {
            status: 'idle',
            error: null,
            currentId: null,
        },
        addFav: {
            status: 'idle',
            error: null,
            currentId: null,
        },
        removeFav: {
            status: 'idle',
            error: null,
            currentId: null,
        },
        editUser: {
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
            .addCase(getCurrentUserFull.pending, (state) => {
                state.operations.currentUser.status = 'loading';
                state.operations.currentUser.error = null;
            })
            .addCase(getCurrentUserFull.fulfilled, (state, action) => {
                state.user = action.payload;
                state.operations.currentUser.status = 'succeeded';
                state.operations.currentUser.error = null;
            })
            .addCase(getCurrentUserFull.rejected, (state, action) => {
                if (action.payload?.status === 401) {
                    state.user = null;
                }
                state.operations.currentUser.status = 'failed';
                state.operations.currentUser.error = action.payload ?? null;
            })
            .addCase(editUser.pending, (state) => {
                state.operations.editUser.status = 'loading';
                state.operations.editUser.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.operations.editUser.status = 'succeeded';
                state.operations.editUser.error = null;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.operations.editUser.status = 'failed';
                state.operations.editUser.error = action.payload ?? null;
            })
            .addCase(addNoticeToFavourite.pending, (state, action) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.favCountBeforeAdding =
                        state.user.noticesFavorites.length;
                }
                state.operations.addFav.status = 'loading';
                state.operations.addFav.currentId = action.meta.arg.notice._id;
                state.operations.addFav.error = null;
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
                state.operations.addFav.status = 'succeeded';
                state.operations.addFav.currentId = null;
                state.operations.addFav.error = null;
            })
            .addCase(addNoticeToFavourite.rejected, (state, action) => {
                state.operations.addFav.status = 'failed';
                state.operations.addFav.currentId = null;
                state.operations.addFav.error = action.payload ?? null;
            })
            .addCase(removeNoticeFromFavourite.pending, (state, action) => {
                state.operations.removeFav.status = 'loading';
                state.operations.removeFav.currentId = action.meta.arg._id;
                state.operations.removeFav.error = null;
            })
            .addCase(removeNoticeFromFavourite.fulfilled, (state, action) => {
                if (state.user && 'noticesFavorites' in state.user) {
                    state.user.noticesFavorites =
                        state.user.noticesFavorites.filter(
                            (notice) => notice._id !== action.payload,
                        );
                }
                state.operations.removeFav.status = 'succeeded';
                state.operations.removeFav.currentId = null;
                state.operations.removeFav.error = null;
            })
            .addCase(removeNoticeFromFavourite.rejected, (state, action) => {
                state.operations.removeFav.status = 'failed';
                state.operations.removeFav.currentId = null;
                state.operations.removeFav.error = action.payload ?? null;
            })
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
            .addCase(removePet.pending, (state, action) => {
                state.operations.removePet.status = 'loading';
                state.operations.removePet.currentId = action.meta.arg;
                state.operations.removePet.error = null;
            })
            .addCase(removePet.rejected, (state, action) => {
                state.operations.removePet.status = 'failed';
                state.operations.removePet.currentId = null;
                state.operations.removePet.error = action.payload ?? null;
            })
            .addCase(removePet.fulfilled, (state, action) => {
                if (state.user && 'pets' in state.user) {
                    state.user.pets = action.payload.pets;
                }
                state.operations.removePet.status = 'succeeded';
                state.operations.removePet.currentId = null;
                state.operations.removePet.error = null;
            });
    },
});

export const { hidePopup } = authSlice.actions;

export const authReducer = authSlice.reducer;
