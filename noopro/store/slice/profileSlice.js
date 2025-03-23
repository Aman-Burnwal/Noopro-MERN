import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",

    initialState: {
        user: null,
    },
    reducers: {

        setUser : (state, action) => {
            console.log("Set user is called")
            console.log(action.payload);
            setUser(state.user = action.payload)
            console.log(state.user);
        },
        removeUser: (state) => {
            console.log("remove user Called ")
            setUser(state.user = null)
        },
    }
})


export const {setUser, removeUser} = profileSlice.actions
export default profileSlice.reducer;