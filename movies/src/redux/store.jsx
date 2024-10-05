import { configureStore } from "@reduxjs/toolkit";
import bearReducer from './bearPopulationSlice'

export const store = configureStore({
    reducer : {
        bear : bearReducer,
    }
})