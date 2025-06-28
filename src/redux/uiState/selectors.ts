import type { RootState } from '../store';

export const selectIsOpen = (state: RootState) => state.menu.isOpen;
