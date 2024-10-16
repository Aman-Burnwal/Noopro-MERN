import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart", 
    initialState: {
        totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    },
    reducers: {
        setToatalItems: (state, action) => {
            state.totalItems = action.payload;
        },
        // add to cart
        // remove cards from cart
        // reset cards to default
        resetTotalItems: (state) => {
            state.totalItems = 0;
        },

    }
})

export const { setToatalItems, resetTotalItems} = cartSlice.actions;
export default cartSlice.reducer;