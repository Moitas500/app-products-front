import { configureStore } from "@reduxjs/toolkit"
import productsReducer from './productsSlice.js'
import shoppingReducer from './shopingCartSlice.js'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: shoppingReducer
    }
})

