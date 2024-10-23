import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: '',
};

export const bearSlice = createSlice({
  name: "bear",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    userlogout : (state) => {
      state.data = null
      console.log(state.data)
    }
  },
});

export const { setUser , userlogout } = bearSlice.actions;
export default bearSlice.reducer;
