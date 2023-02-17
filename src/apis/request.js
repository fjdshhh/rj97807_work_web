import axios from "axios";
import { baseLink } from "../utils/config";
import { message } from "antd";

const service = axios.create({
  baseURL: baseLink,
});

// 请求拦截
function addAuthorization(token) {
  service.interceptors.request.use(
    (config) => {
      config.headers.Authorization = token;
      return config;
    },
    (error) => {}
  );
}
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {}
);

// 响应拦截
service.interceptors.response.use(
  (config) => {
    return Promise.resolve(config);
  },
  (error) => {
    if (error.code === 401) {
      message.error(error.message);
      return Promise.reject(error);
    }
  }
);

export { addAuthorization, service };
