import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
const { Title } = Typography;
export const Headers = ({ collapsed, setCollapsed }) => {
  // const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item onClick={logout} key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
            paddingLeft: "16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 24,
              height: 24,
            }}
          />
          <Title
            style={{
              margin: 0,
              padding: 0,
              fontWeight: "bold",
              color: "#333",
              textTransform: "uppercase",
            }}
            level={2}
            className="mb-0"
          >
            gear focus admin
          </Title>
        </div>

        <div className="pr-4">
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button
              style={{
                fontSize: "16px",
                width: 24,
                height: 24,
                padding: 0,
                background: "#333",
                border: "none",
                color: "#fff",
              }}
              icon={<UserOutlined />}
            ></Button>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
