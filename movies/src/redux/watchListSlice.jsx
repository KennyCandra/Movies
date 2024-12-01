import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: [],
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialState,
  reducers: {
    setWatchList: (state, action) => {
      state.watchlist = action.payload;
    },
    addMovie: (state, action) => {
      state.watchlist = [...state.watchlist, action.payload];
    },
  },
});

export const { setWatchList, addMovie } = watchListSlice.actions;
export default watchListSlice.reducer;
