import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
    name: "projects",

    initialState: {
        projects: []
    },

    reducers: {
        populateArray: (state, action) => {
            state.projects = action.payload
        }
    }
})

export const {populateArray} = projectsSlice.actions

export default projectsSlice.reducer

