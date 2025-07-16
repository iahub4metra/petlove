import type { RootState } from '../store';

export const selectIsOpen = (state: RootState) => state.ui.isOpen;
export const selectLogoutModal = (state: RootState) =>
    state.ui.isOpenLogoutModal;
export const selectModalNotice = (state: RootState) =>
    state.ui.isOpenModalNotice;
export const selectModalAttention = (state: RootState) =>
    state.ui.isOpenModalAttention;
