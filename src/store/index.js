import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
