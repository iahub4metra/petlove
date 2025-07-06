import type { RootState } from '../store';

export const selectFriends = (state: RootState) => state.friends.items;
export const selectFriendsLoading = (state: RootState) => state.friends.loading;
export const selectFriendsError = (state: RootState) => state.friends.error;
