import { service } from "./request";
import qs from "querystring";

// 获取列表
const getArticleList = (data) => {
  let queryString = qs.stringify(data);
  let url = `/article/get?${queryString}`;
  return service({ url, method: "get" });
};

export { getArticleList };
