import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useContext } from "react";
import { ContextUserProvider } from "../context/ContextProvider";

export const Searchs = () => {
  const { setSearchTerm } = useContext(ContextUserProvider);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>
        <Input
          onChange={handleSearchChange}
          addonBefore={<SearchOutlined />}
          placeholder="Search everything"
        />
      </div>
    </>
  );
};
