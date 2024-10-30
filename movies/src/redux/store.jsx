import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./bearPopulationSlice";
import watchListReducer from "./watchListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist: watchListReducer,
  },
});
