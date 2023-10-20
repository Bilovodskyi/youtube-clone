import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
    menu: boolean;
    isVideoPage: boolean;
}

const initialState: MenuState = {
    menu: true,
    isVideoPage: false,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        menuTrue: (state) => {
            state.menu = true;
        },
        menuFalse: (state) => {
            state.menu = false;
        },
        menuToggle: (state) => {
            state.menu = !state.menu;
        },
        isVideoPageTrue: (state) => {
            state.isVideoPage = true;
        },
        isVideoPageFalse: (state) => {
            state.isVideoPage = false;
        },
    },
});

export const {
    menuTrue,
    menuFalse,
    menuToggle,
    isVideoPageTrue,
    isVideoPageFalse,
} = menuSlice.actions;

export default menuSlice.reducer;
