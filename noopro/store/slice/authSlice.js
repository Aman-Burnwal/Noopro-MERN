import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    },

    reducers: {
        addToken: (state, action) => {
            
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        removeToken: (state) => {
         
            localStorage.removeItem("token");
            state.token = null;
            
        }
    }



})

export const {add, removeToken} = authSlice.actions;

export default authSlice.reducer;