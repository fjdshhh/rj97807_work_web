import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user";

export const store = configureStore({
  reducer: {
    userState: userSlice,
  },
});
