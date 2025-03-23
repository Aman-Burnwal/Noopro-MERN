import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",

    initialState: {
        user: null,
    },
    reducers: {

        setUser : (state, action) => {
           
            setUser(state.user = action.payload)
          
        },
        removeUser: (state) => {
        
            setUser(state.user = null)
        },
    }
})


export const {setUser, removeUser} = profileSlice.actions
export default profileSlice.reducer;