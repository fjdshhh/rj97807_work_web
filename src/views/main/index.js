import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getArticleList } from "../../apis/articleApi";

export default function Main() {
  const [articleList, setarticleList] = useState([]);

  useEffect(() => {
    getArticle();

    return () => {};
  }, []);

  async function getArticle() {
    let res = await getArticleList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log(res);
  }

  return <div>main</div>;
}
