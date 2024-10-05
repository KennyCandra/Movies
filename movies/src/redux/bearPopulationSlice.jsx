import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0
}

export const bearSlice = createSlice({
    name :'bear',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++
        },
        decrement : (state)=> {
            state.value--
        },
        showState : (state) => {
            console.log(state.value)
        },
        duplicate : (state) => {
            state.value = state.value * 2
        }
    }
})


export const {increment , decrement , showState , duplicate} = bearSlice.actions;
export default bearSlice.reducer