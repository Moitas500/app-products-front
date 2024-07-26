import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        name: 'Office 2019',
        price: 37000,
        stock: 30
    },
    {
        id: 2,
        name: 'Office 2021 Profession',
        price: 61000,
        stock: 15
    },
    {
        id: 3,
        name: 'Office 2019 Home',
        price: 378000,
        stock: 20
    },
    {
        id: 4,
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
                state.push(action.payload)
            }
        }
    }
)

export const {addProduct} = productsSlice.actions
export default productsSlice.reducer
