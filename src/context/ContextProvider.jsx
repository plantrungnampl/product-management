import { Spin, message } from "antd";
import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
export const ContextUserProvider = createContext();
import { v4 as uuidv4 } from "uuid";
uuidv4();
export const ContextProvider = ({ children }) => {
  // addNewUser:
  const addUsers = async (payload) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        payload
      );
      message.success("Add user successfully");
      setIsLoading(false);

      return response.data;
    } catch (error) {
      message.error("Add user failed");
      console.log(error);
    }
    setIsLoading(false);
    usersData();
  };
  // end
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  // search:
  const [filteredDataUsers, setFilteredDataUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // delete:
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const hasSelected = selectedRowKeys?.length > 0;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  };
  // const handleDelete = async () => {
  //   // Tạo một mảng các Promise từ việc gọi hàm deleteUser cho mỗi id đã chọn
  //   const deleteHandle = selectedRowKeys.map((key) => deleteUser(key));
  //   // Chờ tất cả các Promise hoàn thành
  //   await Promise.all(deleteHandle);
  //   // Cập nhật lại danh sách đã chọn sau khi xoá
  //   setSelectedRowKeys([]);
  // };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // Xác định các sản phẩm cần xóa dựa trên selectedRowKeys
      const selectedProducts = userData.filter((product) =>
        selectedRowKeys.includes(product.id)
      );

      // Tạo mảng lời hứa xóa
      const deletePromises = selectedProducts.map((product) =>
        deleteUser(product.id)
      );

      // Chờ tất cả các lời hứa xóa được giải quyết
      await Promise.all(deletePromises);

      // Cập nhật state và UI
      setUserData(
        userData.filter(
          (product) =>
            !selectedProducts.some(
              (selectedProduct) => selectedProduct.id === product.id
            )
        )
      );
      setFilteredDataUsers(
        filteredDataUsers.filter(
          (product) =>
            !selectedProducts.some(
              (selectedProduct) => selectedProduct.id === product.id
            )
        )
      );
      message.success("Delete Users successfully");
    } catch (error) {
      message.error("Delete Users failed: " + error.message);
    } finally {
      setIsLoading(false);
      setSelectedRowKeys([]);
    }
  };
  // end
  useEffect(() => {
    const debouncedFilter = _.debounce(() => {
      setFilteredDataUsers(filteredData);
    }, 300);

    debouncedFilter();
  }, [searchTerm, userData]);

  const filteredData = useMemo(() => {
    return _.filter(userData, (user) => {
      const fullName =
        `${user?.name?.firstname} ${user?.name?.lastname}`.toLowerCase();
      return fullName?.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, userData]);
  //delete:
  // const deleteUser = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.delete(
  //       `https://fakestoreapi.com/users/${id}`
  //     );
  //     console.log(response);
  //     setUserData(userData.filter((user) => user.id !== id));
  //     setFilteredDataUsers(filteredDataUsers.filter((user) => user.id !== id));
  //     message.success("Delete user successfully");
  //     console.log(response.data);
  //   } catch (error) {
  //     message.error("Delete user failed");
  //   }
  //   setIsLoading(false);
  //   usersData();
  // };

  const deleteUser = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/users/${id}`
      );
      console.log("response product", response);
      setUserData(userData.filter((user) => user.id !== id));
      setFilteredDataUsers(filteredDataUsers.filter((user) => user.id !== id));
    } catch (error) {
      // message.error("Delete product failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const usersData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      setUserData(response.data);
    } catch (error) {
      message.error("Get users failed");
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    usersData();
  }, []);

  const updateUser = async (id, payload) => {
    let hasError = false;
    try {
      setIsLoading(true);
      const response = await axios.put(
        `https://fakestoreapi.com/users/${id}`,
        payload
      );
      setFilteredDataUsers(
        userData.map((user) => (user.id === id ? response.data : user))
      );
      console.log("response data cua update===", response.data);
      message.success("Update user successfully");
      return response.data;
    } catch (error) {
      hasError = true;
      message.error("Update user failed: " + error.message);
      // Xử lý lỗi cụ thể tại đây nếu cần
      console.error(error);
    } finally {
      setIsLoading(false);
      if (hasError) {
        message.warning(
          "Đã xảy ra lỗi không xác định trong quá trình cập nhật."
        );
      }
    }
  };
  return (
    <ContextUserProvider.Provider
      value={{
        userData,
        setUserData,
        setSearchTerm,
        filteredDataUsers,
        onSelectChange,
        handleDelete,
        hasSelected,
        setFilteredDataUsers,
        // test
        addUsers,
        selectedRowKeys,
        // update:
        updateUser,
      }}
    >
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        children
      )}
    </ContextUserProvider.Provider>
  );
};
