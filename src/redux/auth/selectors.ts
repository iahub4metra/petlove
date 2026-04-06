import type { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectShowPopup = (state: RootState) =>
    state.auth.showPopUpFirstFav;
export const selectAuthOperations = (state: RootState) => state.auth.operations;
