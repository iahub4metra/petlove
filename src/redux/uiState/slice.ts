import { createSlice } from '@reduxjs/toolkit';

interface InitialValue {
    isOpen: boolean;
    isOpenLogoutModal: boolean;
    isOpenModalNotice: boolean;
    isOpenModalAttention: boolean;
}

const initialState: InitialValue = {
    isOpen: false,
    isOpenLogoutModal: false,
    isOpenModalNotice: false,
    isOpenModalAttention: false,
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
        manageModalNotice: (state, action) => {
            state.isOpenModalNotice = action.payload;
        },
        manageModalAttention: (state, action) => {
            state.isOpenModalAttention = action.payload;
        },
    },
});

export const {
    openMenu,
    closeMenu,
    manageLogoutModal,
    manageModalNotice,
    manageModalAttention,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
