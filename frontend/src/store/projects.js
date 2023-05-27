import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
    name: "projects",

    initialState: {
        projects: []
    },

    reducers: {
        populateArray: (state, action) => {
            state.projects = action.payload
        },

        resetArray: (state) => {
            state.projects = []
        }
    }
})

export const {populateArray, resetArray} = projectsSlice.actions

export default projectsSlice.reducer

