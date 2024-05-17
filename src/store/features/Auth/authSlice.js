import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    username: undefined,
  },
  reducers: {
    authState: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.username = action.payload.username;
    },
  },
});

export const { authState } = authSlice.actions;
export default authSlice.reducer;
