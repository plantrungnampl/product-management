import React, { useContext, useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "../components/Sidebar";
import { Headers } from "../components/Headers";

import { Navigate, Outlet } from "react-router";

import { AuthContext } from "../context/AuthContextProvider";
const { Header, Footer, Sider, Content } = Layout;

export const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="Signin" />;
  } else {
    <Outlet />;
  }
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 2,
          width: "100%",
          padding: 0,
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        className="text-white bg-[#4096ff]"
      >
        <Headers collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
            zIndex: 1,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout
          className="100%"
          style={{
            marginLeft: collapsed ? "80px" : "200px",
            minHeight: "100vh",
          }}
        >
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              paddingTop: "64px",
            }}
          >
            <Outlet />
          </Content>
          {/* <Footer
            style={{
              position: "sticky",
              bottom: 0,
              padding: "10px 50px",
              width: "100%",
              background: "#ddd",
              color: "rgba(255, 255, 255, 0.65)",
            }}
          >
            <Footers />
          </Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};
