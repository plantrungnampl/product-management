import { Button, Checkbox, Spin, Table, Typography } from "antd";
import React, { useContext, useState } from "react";
import { ContextUserProvider } from "../../context/ContextProvider";
import { Searchs } from "../../components/Searchs";
import { DeleteUsers } from "../../components/DeleteUsers";
import { ModalCreateUsers } from "../../components/ModalCreateUsers";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { ModalUpdateUsers } from "../../components/ModalUpdateUsers";

export const Home = () => {
  const { filteredDataUsers, onSelectChange, selectedRowKeys, updateUser } =
    useContext(ContextUserProvider);
  const [bottom, setBottom] = useState("bottomLeft");
  const dataUserMap = filteredDataUsers.map((user) => ({
    ...user,
    key: user.id,
  }));
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="whitespace-nowrap ">
      <div>
        <Searchs />
      </div>
      <div>
        <ModalCreateUsers />
      </div>
      <div className="overflow-scroll">
        {dataUserMap.length > 0 ? (
          <div>
            <Table
              pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ["5", "10"],
                position: [bottom],
              }}
              rowSelection={rowSelection}
              dataSource={dataUserMap}
            >
              <ColumnGroup title="name">
                <Column
                  title="firstname"
                  dataIndex="name.firstname"
                  key="name.firstname"
                  sorter={(a, b) => {
                    const nameA = a?.name?.firstname || "";
                    const nameB = b?.name?.firstname || "";
                    return nameA.localeCompare(nameB);
                  }}
                  render={(text, record) =>
                    record.name && record.name.firstname
                      ? record.name.firstname
                      : "N/A"
                  }
                />
                <Column
                  title="lastname"
                  dataIndex="name.lastname"
                  id="name.lastname"
                  sorter={(a, b) => {
                    const nameA = a?.name?.lastname || "";
                    const nameB = b?.name?.lastname || "";
                    return nameA.localeCompare(nameB);
                  }}
                  render={(text, record) =>
                    record.name && record.name.lastname
                      ? record.name.lastname
                      : "N/A"
                  }
                />
              </ColumnGroup>

              <Column
                title="username"
                dataIndex="username"
                key="username"
                sorter={(a, b) => a?.username.localeCompare(b?.username)}
              />
              <Column
                title="email"
                dataIndex="email"
                key="email"
                sorter={(a, b) => a.email.localeCompare(b.email)}
                render={(text, record) => (
                  <a
                    href={`mailto :${record.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {record.email}
                  </a>
                )}
              />
              <Column
                title="address"
                dataIndex="address"
                key="address"
                sorter={(a, b) => a.address.city.localeCompare(b.address.city)}
                render={(text, record) =>
                  record.address && record.address.city
                    ? record.address.city
                    : "N/A"
                }
              />
              <Column
                title="phone"
                dataIndex="phone"
                key="phone"
                sorter={(a, b) => a.phone.localeCompare(b.phone)}
              />
              <Column
                title="action"
                key="action"
                render={(text, record) => (
                  <div className="flex">
                    <button>
                      <ModalUpdateUsers record={record} />
                    </button>
                  </div>
                )}
              />
            </Table>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title level={2}>
              Không tìm thấy người dùng
            </Typography.Title>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "10px 50px",
          width: "100%",
          background: "#ddd",
          color: "rgba(255, 255, 255, 0.65)",
          position: "sticky",
          bottom: 0,
        }}
      >
        <DeleteUsers />
      </div>
    </div>
  );
};
