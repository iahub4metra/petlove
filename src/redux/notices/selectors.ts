import type { RootState } from '../store';

export const selectNotices = (state: RootState) => state.notices.notices;
export const selectPage = (state: RootState) => state.notices.page;
export const selectTotlaPages = (state: RootState) => state.notices.totalPages;
export const selectLoading = (state: RootState) => state.notices.loading;
export const selectSelectedPet = (state: RootState) =>
    state.notices.selectedPet;
export const selectFilters = (state: RootState) => state.notices.filters;
