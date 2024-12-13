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
    removeMovie: (state, action) => {
      console.log(state.watchlist);
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { setWatchList, addMovie, removeMovie } = watchListSlice.actions;
export default watchListSlice.reducer;
