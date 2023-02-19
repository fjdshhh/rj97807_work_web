import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Button } from "antd";
import style from "./index.module.scss";
import { getArticleList } from "../../apis/articleApi";
import { List } from "antd";
// 引入相关的hooks
import { useSelector } from "react-redux";
// 引入相关方法
import { useNavigate } from "react-router-dom";

export default function Main() {
  // 默认生成
  const { Content } = Layout;

  const navigate = useNavigate();
  // 文章列表
  const [articleList, setarticleList] = useState([]);
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

  useEffect(() => {
    if (userValue.isLogin === true && userValue.Name === "") {
      navigate("/login");
    }
    if (userValue.Name !== "" && userValue.isLogin === true) {
      // TODO 确认登录开始加载左侧列表
    }

    getArticle();
    return () => {};
  }, [params, userValue]);

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
    </div>
  );
}
