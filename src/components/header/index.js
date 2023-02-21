import React from "react";
import { Input, Avatar, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { Button, message } from "antd";
import { fileUpload } from "../../apis/userApi";
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
  const props = {
    // 单文件上传
    beforeUpload: async (file) => {
      const form = new FormData();
      form.append("file", file);
      console.log(form);
      let res = await fileUpload(form, {
        headers: {
          ContentType: "multipart/form-data",
        },
      });
      if (res.status === 200) {
        message.success("上传成功");
      } else {
        message.error("上传失败");
      }
    },
  };
  const SwitchAvatar = () => {
    if (userValue.Name != "") {
      return (
        <div className={style.rightBox}>
          <Upload {...props}>
            <Button>Select File</Button>
          </Upload>

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
