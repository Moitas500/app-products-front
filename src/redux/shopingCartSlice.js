import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const shoppingCartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {
            addProductCart: (state, action) => {
                state.push(action.payload)
            }
        }
    }
)

export const { addProductCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer
