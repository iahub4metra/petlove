import type { RootState } from '../store';

export const selectIsOpen = (state: RootState) => state.ui.isOpen;
export const selectLogoutModal = (state: RootState) =>
    state.ui.isOpenLogoutModal;
