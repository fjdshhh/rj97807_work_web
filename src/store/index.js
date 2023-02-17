import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user";

const store = configureStore({
  reducer: {
    userState: userSlice,
  },
});

export default store;
