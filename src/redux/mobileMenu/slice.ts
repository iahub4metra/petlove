import { createSlice } from '@reduxjs/toolkit';

interface InitialValue {
    isOpen: boolean;
}

const initialState: InitialValue = {
    isOpen: false,
};

const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isOpen = true;
        },
        closeMenu: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openMenu, closeMenu } = mobileMenuSlice.actions;
export const mobileMenuReducer = mobileMenuSlice.reducer;
