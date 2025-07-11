import { createSlice } from '@reduxjs/toolkit';

interface InitialValue {
    isOpen: boolean;
    isOpenLogoutModal: boolean;
}

const initialState: InitialValue = {
    isOpen: false,
    isOpenLogoutModal: false,
};

const uiSlice = createSlice({
    name: 'uiState',
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isOpen = true;
        },
        closeMenu: (state) => {
            state.isOpen = false;
        },
        manageLogoutModal: (state, action) => {
            state.isOpenLogoutModal = action.payload;
        },
    },
});

export const { openMenu, closeMenu, manageLogoutModal } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
