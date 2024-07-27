import { createSlice } from "@reduxjs/toolkit";
import environment from "../environments/environment";

const initialState = {
    acceptanceToken: "",
    currency: "COP",
    reference: "",
    integrityKey: environment.integrityKey,
    signature: "",
    isTransactionMade: false
}

export const paymentSlice = createSlice(
    {
        name: 'payment',
        initialState,
        reducers: {
            addAcceptanceToken: (state, action) => {
                state.acceptanceToken = action.payload
            },
            addReference: (state, action) => {
                state.reference = action.payload
            },
            addSignature: (state, action) => {
                state.signature = action.payload
            },
            changeStatusTransaction: (state, action) => {
                state.isTransactionMade = action.payload
            }
        }
    }
)

export const { addAcceptanceToken, addReference, addSignature, changeStatusTransaction } = paymentSlice.actions
export default paymentSlice.reducer
