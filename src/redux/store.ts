import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './uiState/slice';
import { authReducer } from './auth/slice';

const store = configureStore({
    reducer: {
        menu: uiReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
