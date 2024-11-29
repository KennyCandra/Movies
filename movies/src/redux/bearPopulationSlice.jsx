import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    userlogout : (state) => {
      state.data = null
    }
  },
});


export const { setUser , userlogout } = userSlice.actions;
export default userSlice.reducer;
