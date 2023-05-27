import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
    name: "screen",

    initialState: {
        screen: "projects"
    },

    reducers: {
        updateScreen: (state, action) => {
            state.screen = action.payload
        },

        resetScreen: (state) => {
            state.screen = "projects"
        }
    }
})

export const {updateScreen, resetScreen} = screenSlice.actions

export default screenSlice.reducer