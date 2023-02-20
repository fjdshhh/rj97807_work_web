import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Button } from "antd";
import style from "./index.module.scss";
import { getArticleList } from "../../apis/articleApi";
import { userRoles } from "../../apis/userApi";
import { List } from "antd";
import ChatBox from "../../components/rightBox/index";
// 引入相关的hooks
import { useSelector } from "react-redux";
// 引入相关方法
import { useNavigate } from "react-router-dom";
// 引入socket
import socket from "../../apis/webSocket";

export default function Main() {
  // 默认生成
  const { Content } = Layout;

  const navigate = useNavigate();
  // 文章列表
  const [articleList, setarticleList] = useState([]);
  // 用户权限下的分类
  const [menu, setMenu] = useState([]);
  // 总数
  const [articleParams, setArticleParams] = useState({
    totalNum: 0,
    totalSize: 0,
  });
  // redux
  const userValue = useSelector((store) => store.userState);
  // 请求参数
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
  });
  // socket得到的消息
  const [socketMsg, setSocketMsg] = useState({});
  // 用户侧的生命周期
  useEffect(() => {
    if (userValue.isLogin === true && userValue.Name === "") {
      navigate("/login");
    }
    if (userValue.Name !== "" && userValue.isLogin === true) {
      // TODO 确认登录开始加载左侧列表
      getMenu();
    }
    //
    return () => {};
  }, [userValue, navigate]);

  // 文章的生命周期
  useEffect(() => {
    async function getArticle() {
      let res = await getArticleList(params);
      if (res.status === 200) {
        setarticleList(res.data.data);
        setArticleParams({
          totalNum: res.data.totalNum,
          totalSize: res.data.totalSize,
        });
      }
    }
    getArticle();
    return () => {};
  }, [params]);

  // socket的生命周期
  useEffect(() => {
    socket.onopen = (e) => {
      console.log("socket打开", e);
    };
    socket.onmessage = (msg) => {
      console.log("socket收到", msg);
      setSocketMsg(JSON.parse(msg.data));
    };
    socket.onclose = (e) => {
      console.log("socket关闭", e);
    };
    socket.onerror = (msg) => {
      console.log("socket发生错误", msg);
    };
    return () => {
      // socket.emit("message", ".exit");
    };
  }, [socketMsg]);

  // 角色下关联的分类
  async function getMenu() {
    let res = await userRoles();
    if (res !== undefined) {
      setMenu(res.data.data);
    }
  }

  // 打开页面
  function openArticle(val) {
    window.open(val);
  }
  // 翻页
  function turnPage(val) {
    if (val) {
      // 上一页
      setParams({ ...params, pageNum: params.pageNum - 1 });
    } else {
      // 下一页
      setParams({ ...params, pageNum: params.pageNum + 1 });
    }
  }
  // 渲染
  const ShowArticle = () => {
    return (
      <List
        dataSource={articleList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              onClick={() => {
                openArticle(item.url);
              }}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  };
  const ShowMent = menu.map((item) => {
    return <li key={"menuChar" + item.menuChar}>{item.name}</li>;
  });
  return (
    <div className={style.mainBox}>
      <div>
        <span>类型&nbsp;&nbsp;</span>
        <Button
          onClick={() => turnPage(true)}
          disabled={params.pageNum > 1 ? false : true}
        >
          上一页
        </Button>
        <Button
          onClick={() => turnPage(false)}
          disabled={params.pageNum < articleParams.totalSize ? false : true}
        >
          下一页
        </Button>
        <Breadcrumb className={style.broadTool}>
          <Breadcrumb.Item>{params.pageNum}</Breadcrumb.Item>
          <Breadcrumb.Item>{articleParams.totalSize}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className={style.article}>
        <ShowArticle />
      </Content>
      <ul className={style.menu}>{ShowMent}</ul>
      <div className={style.socketBox}>
        <ChatBox msg={socketMsg} so={socket}></ChatBox>
      </div>
    </div>
  );
}
