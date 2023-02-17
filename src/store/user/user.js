import { createSlice } from "@reduxjs/toolkit";

// 创建一个状态切片
const userSlice = createSlice({
  name: "userState",
  initialState: {
    Name: "",
    Token: "",
    ReToken: "",
  },
  reducers: {
    setUserInfo: (state, value) => {
      return { ...state, ...value };
    },
    getUserInfo: (state) => {
      return state;
    },
  },
});
export default userSlice;
