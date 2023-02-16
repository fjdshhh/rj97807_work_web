import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./index.scss";
import Main from "./views/main/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Content, Sider } = Layout;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Layout className="BasicBox">
      <Header>1</Header>
      <Layout>
        <Sider theme="light">
          <Menu>2</Menu>
          <Menu>3</Menu>
        </Sider>
        <Layout>
          <Breadcrumb>
            <Breadcrumb.Item>4</Breadcrumb.Item>
            <Breadcrumb.Item>5</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main></Main>}></Route>
              </Routes>
            </BrowserRouter>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Provider>
);
