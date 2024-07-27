import { configureStore } from "@reduxjs/toolkit"
import productsReducer from './productsSlice.js'
import shoppingReducer from './shopingCartSlice.js'
import paymentReducer from './paymentSlice.js'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: shoppingReducer,
        payment: paymentReducer,
    }
})

