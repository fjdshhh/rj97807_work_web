import React from "react";
import { Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { Button, message } from "antd";
// 引入相关hook
import { useDispatch, useSelector } from "react-redux";
// 引入相关方法
import { setUserInfo } from "../../store/user/user";

export default function Index() {
  // 通过useDispatch 派发事件
  const dispatch = useDispatch();
  const userValue = useSelector((store) => store.userState);
  const userLogion = () => {
    dispatch(setUserInfo({ isLogin: true }));
  };

  const Search = () => {
    return <Input placeholder="这是一个搜索框" />;
  };

  const SwitchAvatar = () => {
    if (userValue.Name != "") {
      return (
        <div>
          <Button>点我上传文件</Button>
          <span>我是:{userValue.Name}</span>
        </div>
      );
    } else {
      return (
        <Avatar
          icon={<UserOutlined />}
          onClick={() => {
            userLogion();
          }}
        />
      );
    }
  };
  return (
    <div className={style.baseBox}>
      <Search />
      <SwitchAvatar />
    </div>
  );
}
