import { createSlice } from "@reduxjs/toolkit";

// 创建一个状态切片
export const userSlice = createSlice({
  name: "userState",
  initialState: {
    Name: "",
    Token: "",
    ReToken: "",
    isLogin: false,
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      return { ...state, ...payload };
    },
    getUserInfo: (state) => {
      return state;
    },
  },
});

// 导出方法
export const { setUserInfo, getUserInfo } = userSlice.actions;

// 导出Slice
export default userSlice.reducer;
