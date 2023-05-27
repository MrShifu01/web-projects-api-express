import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
    name: "update",

    initialState: {
        projectId: ''
    },

    reducers: {
        assignProjectId: (state, action) => {
            state.projectId = action.payload
        }
    }
})

export const {assignProjectId} = updateSlice.actions

export default updateSlice.reducer