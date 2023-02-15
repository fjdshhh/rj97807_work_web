import React from "react";
import styles from './Main.model.scss';
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Sider } = Layout;

// type Props = {};

export default function main() {
  return (
    <Layout className={styles.BasicBox}>
      <Header>
        <div>1</div>
      </Header>
      <Layout>
        <Sider>
          <Menu>2</Menu>
        </Sider>
        <Layout>
          <Breadcrumb>
            <Breadcrumb.Item>1</Breadcrumb.Item>
            <Breadcrumb.Item>2</Breadcrumb.Item>
            <Breadcrumb.Item>3</Breadcrumb.Item>
          </Breadcrumb>
          <Content>4</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
