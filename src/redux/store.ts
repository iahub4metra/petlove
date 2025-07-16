import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './uiState/slice';
import { authReducer } from './auth/slice';
import { newsReducer } from './news/slice';
import { friendsReducer } from './friends/slice';
import { noticesReducer } from './notices/slice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        news: newsReducer,
        friends: friendsReducer,
        notices: noticesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
