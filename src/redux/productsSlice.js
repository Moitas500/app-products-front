import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: 'Office 2019',
        price: 37000,
        stock: 30
    },
    {
        name: 'Office 2021 Profession',
        price: 61000,
        stock: 15
    },
    {
        name: 'Office 2019 Home',
        price: 378000,
        stock: 20
    },
    {
        name: 'Project Professional 2021',
        price: 42000,
        stock: 10
    },
]

export const productsSlice = createSlice(
    {
        name: "products",
        initialState,
        reducers: {
            addProduct: (state, action) => {
                const { name, price, stock } = action.payload
                state.name = name
                state.price = price
                state.stock = stock
            }
        }
    }
)

export const {addProduct} = productsSlice.actions
export default productsSlice.reducer
