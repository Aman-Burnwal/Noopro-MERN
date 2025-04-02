import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",

    initialState: {
        user: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    },
    reducers: {

        setUser : (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload));
            setUser(state.user = action.payload)
          
        },
        removeUser: (state) => {
        
            setUser(state.user = null)
        },
    }
})


export const {setUser, removeUser} = profileSlice.actions
export default profileSlice.reducer;