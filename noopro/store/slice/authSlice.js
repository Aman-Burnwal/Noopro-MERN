import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    },

    reducers: {
        add: (state, action) => {
            state.token = action?.token;
        }
    }



})

export const {add} = authSlice.actions;

export default authSlice.reducer;