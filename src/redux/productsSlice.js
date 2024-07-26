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
        name: "prodcuts",
        initialState,
    }
)

export default productsSlice.reducer
