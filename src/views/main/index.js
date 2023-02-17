import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Button } from "antd";
import style from "./index.module.scss";
import { getArticleList } from "../../apis/articleApi";
import { List } from "antd";

export default function Main() {
  const { Header, Content, Sider } = Layout;
  // 文章列表
  const [articleList, setarticleList] = useState([]);
  // 总数
  const [articleParams, setArticleParams] = useState({
    totalNum: 0,
    totalSize: 0,
  });
  // 请求参数
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
  });

  useEffect(() => {
    getArticle();
    return () => {};
  }, [params]);

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
