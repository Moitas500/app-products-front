import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const shoppingCartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {
            addProductCart: (state, action) => {
                state.push(action.payload)
            },
            eraseProduct: (state, action) => {
                const index = state.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            }
        }
    }
)

export const { addProductCart, eraseProduct } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer
