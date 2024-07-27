import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    acceptanceToken: "",
}

export const paymentSlice = createSlice(
    {
        name: 'payment',
        initialState,
        reducers: {
            addAcceptanceToken: (state, action) => {
                state.acceptanceToken = action.payload
            }
        }
    }
)

export const { addAcceptanceToken } = paymentSlice.actions
export default paymentSlice.reducer
