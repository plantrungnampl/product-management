import { Spin, message } from "antd";
import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // navigate("/");
  //     // return <Outlet />;
  //     return;
  //   } else {
  //     navigate("/Signin");
  //   }
  // }, [isLoggedIn, navigate]);

  const login = useCallback(async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.gearfocus.div4.pgtest.co/api/authentication/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("userToken", response.data.token);
        setIsLoggedIn(true);
        message.success("Login successfully");
      } else {
        message.error("Login failed, invalid email or password");
      }
    } catch (error) {
      message.error("Login failed");
    }

    setIsLoading(false);
  }, []);
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "https://api.gearfocus.div4.pgtest.co/api/authentication/logout",
        { token }
      );
      console.log(response.data);
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      message.success("Logout successfully");
      navigate("/Signin"); // Navigate after updating the state
    } catch (error) {
      message.error("Logout failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setIsLoggedIn, navigate]);
  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, login, logout }}>
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
