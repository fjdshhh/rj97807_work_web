import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./index.scss";
import Main from "./views/main/index";
import Login from "./views/login/index";
import HeaderComp from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { Layout, Menu } from "antd";
const { Header, Sider } = Layout;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Layout className="BasicBox">
      <Header className="header">
        <HeaderComp />
      </Header>
      <Layout>
        <Sider theme="light">
          <Menu>2</Menu>
          <Menu>3</Menu>
        </Sider>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main></Main>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
          </BrowserRouter>
        </Layout>
      </Layout>
    </Layout>
  </Provider>
);
