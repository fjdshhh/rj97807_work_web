import { service } from "./request";

// 用户登录
const userLogin = (params) => {
  let url = `/user/login`;
  return service.post(url, params);
};

// 用户注册发送验证码
const userSendCode = (params) => {
  let url = `/user/registerbefore`;
  return service.post(url, params);
};

// 用户注册
const userRegister = (params) => {
  let url = `/user/register`;
  return service.post(url, params);
};
// 用户刷新Token
const userRefresh = (params) => {
  let url = `/user/refresh`;
  return service.post(url, params);
};

// 用户权限分类
const userRoles = (params) => {
  let url = `/user/getmenu`;
  return service.post(url, params);
};

// 用户文件上传
const fileUpload = (params) => {
  let url = `/file/upload`;
  return service.post(url, params);
};

export {
  userLogin,
  userSendCode,
  userRegister,
  userRefresh,
  userRoles,
  fileUpload,
};
