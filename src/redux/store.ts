import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './uiState/slice';
import { authReducer } from './auth/slice';
import { newsReducer } from './news/slice';

const store = configureStore({
    reducer: {
        menu: uiReducer,
        auth: authReducer,
        news: newsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
