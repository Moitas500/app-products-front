import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    total: 0,
    totalInCents: 0
}

export const shoppingCartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {
            addProductCart: (state, action) => {
                state.cart.push(action.payload)
                state.total = state.cart.reduce((total, product) => total + product.price, 0)
                state.totalInCents = state.total * 100
            },
            eraseProduct: (state, action) => {
                const index = state.cart.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.cart.splice(index, 1);
                }
                state.total = state.cart.reduce((total, product) => total + product.price, 0)
                state.totalInCents = state.total * 100
            }
        }
    }
)

export const { addProductCart, eraseProduct } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer
