import type { RootState } from '../store';

export const selectNews = (state: RootState) => state.news.news;
export const selectPage = (state: RootState) => state.news.page;
export const selectTotalPages = (state: RootState) => state.news.totalPages;
export const selectNewsLoading = (state: RootState) => state.news.loading;
export const selectKeyword = (state: RootState) => state.news.keyword;
