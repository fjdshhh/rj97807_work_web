import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { Input, Button, message } from "antd";
import { userLogin } from "../../apis/userApi";

import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../store/user/user";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redux
  const userValue = useSelector((store) => store.userState);
  useEffect(() => {
    if (userValue.Name !== "" && userValue.isLogin === true) {
      navigate("/");
    }
    return () => {};
  }, [userValue]);

  // 选择注册还是登录
  function choseType() {
    setIsLogin(!isLogin);
  }

  async function submitLogin(name, pwd) {
    let res = await userLogin({
      name,
      pwd,
    });
    // console.log(res);
    // 登录成功
    if (res !== undefined) {
      dispatch(
        setUserInfo({
          Name: name,
          Token: res.data.token,
          ReToken: res.data.reToken,
        })
      );
      message.success("登录成功");
    } else {
      // 登录失败
      message.error("账号或密码错误");
    }
  }

  // 打开登录
  const ChoseLogin = () => {
    const [username, setUsername] = useState("");
    const [userpwd, setUserpwd] = useState("");
    return (
      <div>
        <h2>我要登录</h2>
        <Input
          placeholder="请输入账号"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          placeholder="请输入密码"
          value={userpwd}
          onChange={(e) => {
            setUserpwd(e.target.value);
          }}
        ></Input>
        <div className={style.buttons}>
          <Button
            onClick={() => {
              choseType();
            }}
          >
            去注册
          </Button>
          <Button
            onClick={() => {
              submitLogin(username, userpwd);
            }}
          >
            登录
          </Button>
        </div>
      </div>
    );
  };
  // 打开注册
  const ChoseRegister = () => {
    const [username, setUsername] = useState("");
    const [userpwd, setUserpwd] = useState("");
    const [useremail, setUseremail] = useState("");
    const [code, setCode] = useState("");
    return (
      <div>
        <h2>我要注册</h2>
        <Input
          placeholder="请输入账号"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          placeholder="请输入密码"
          value={userpwd}
          onChange={(e) => {
            setUserpwd(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="请输入邮箱"
          value={useremail}
          onChange={(e) => {
            setUseremail(e.target.value);
          }}
        />
        <div className={style.sendCode}>
          <Input.Group compact>
            <Input
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <Button type="primary">发送验证码</Button>
          </Input.Group>
        </div>

        <div className={style.buttons}>
          <Button
            onClick={() => {
              choseType();
            }}
          >
            去登录
          </Button>
          <Button>注册</Button>
        </div>
      </div>
    );
  };
  // 选择模式
  const ShowVal = () => {
    if (isLogin) {
      return <ChoseLogin></ChoseLogin>;
    } else {
      return <ChoseRegister></ChoseRegister>;
    }
  };

  return (
    <div className={style.siteBox}>
      <ShowVal></ShowVal>
    </div>
  );
}
