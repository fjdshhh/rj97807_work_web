import React from "react";
import { Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./index.module.scss";

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
      return <div>{userValue.Name}</div>;
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
