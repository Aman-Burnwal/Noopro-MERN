import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",

    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    },
    reducers: {

        setUser : (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            setUser(state.user = action.payload)
          
        },
        removeUser: (state) => {
            localStorage.removeItem("token");
            setUser(state.user = null)
        },
    }
})


export const {setUser, removeUser} = profileSlice.actions
export default profileSlice.reducer;