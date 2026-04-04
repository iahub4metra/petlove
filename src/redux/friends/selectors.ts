import type { RootState } from '../store';

export const selectFriends = (state: RootState) => state.friends.items;
export const selectFriendsOperations = (state: RootState) =>
    state.friends.operations;
