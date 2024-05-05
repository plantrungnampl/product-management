import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const selectedKey =
    location.pathname === "/"
      ? "1"
      : location.pathname === "/Products"
      ? "2"
      : null;

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectedKey}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            // label: "Users",
            label: <Link to="/">Users</Link>,
          },
          {
            key: "2",
            icon: <ShopOutlined />,
            label: <Link to="/Products">Products</Link>,
          },
        ]}
      ></Menu>
    </div>
  );
};
