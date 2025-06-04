import { configureStore } from '@reduxjs/toolkit';
import { mobileMenuReducer } from './mobileMenu/slice';

const store = configureStore({
    reducer: {
        menu: mobileMenuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
