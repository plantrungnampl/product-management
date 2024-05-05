import { Button } from "antd";
import React, { useContext } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { ProductContext } from "../context/ContextProductProvider";
const { confirm } = Modal;
export const DeleteProduct = () => {
  const showConFirm = () => {
    confirm({
      title: "Are you sure delete this Products?",
      icon: <DeleteFilled />,
      onOk() {
        console.log("OK");
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const { handleDelete, hasSelected, selectedRowKeys } =
    useContext(ProductContext);
  return (
    <div className="w-full">
      <div className="">
        <Button
          danger
          type="primary"
          shape="round"
          size="large"
          icon={<DeleteFilled />}
          onClick={showConFirm}
          disabled={!hasSelected}
        >
          delete
        </Button>
        <span
          style={{
            marginLeft: 8,
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys?.length} items` : ""}
        </span>
      </div>
    </div>
  );
};
