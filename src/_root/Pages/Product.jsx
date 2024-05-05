import {
  Button,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Slider,
  Space,
  Table,
} from "antd";
import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ContextProductProvider";
import Column from "antd/es/table/Column";
import { Typography, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ModalCreateProducts } from "../../components/ModalCreateProducts";
import { DeleteProduct } from "../../components/DeleteProduct";
import FilterSearch from "../../components/FilterSearch";
import { ModalUpdateProduct } from "../../components/ModalUpdateProduct";
const { Text } = Typography;
export const Product = () => {
  const {
    setSearchTerm,
    filteredProducts,
    onSelectChange,
    selectedRowKeys,
    setFilteredProducts,
    products,

    selectedCategory,
  } = useContext(ProductContext);

  const dataMap = filteredProducts.map((product) => {
    return {
      key: product.id,
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      created_at: new Date(product.created_at).toLocaleDateString("en-US"),
      // updated_at: new Date(product.updated_at).toLocaleDateString("en-US"),
    };
  });
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const handleChangerSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="white">
      <div className="flex justify-center items-center mb-4">
        <div className="w-1/3 mr-4 flex items-center justify-center">
          <Input
            onChange={handleChangerSearchChange}
            addonBefore={<SearchOutlined />}
            placeholder="Search Products"
            className="rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <div className="flex flex-col items-center">
            <FilterSearch />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <ModalCreateProducts />
      </div>

      {dataMap.length > 0 ? (
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["5", "10", "15", "20"],
          }}
          scroll={{ x: 1200 }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          dataSource={dataMap}
        >
          <Column
            responsive={["md"]}
            title="Name"
            dataIndex="title"
            key="title"
            sorter={(a, b) => a.title.localeCompare(b.title)}
            render={(text) => (
              <a className="block max-w-[10rem] min-w-[9rem]">{text}</a>
            )}
          />
          <Column
            title="Price"
            dataIndex="price"
            key="price"
            render={(price) => `$${price.toFixed(2)}`}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            responsive={["md"]}
            render={(text) => <Text>{text}</Text>}
          />
          <Column
            title="Category"
            dataIndex="category"
            key="category"
            render={(text) => <span className="inline-block">{text}</span>}
          />
          <Column
            title="Image"
            dataIndex="image"
            key="image"
            render={(text, record) => (
              <Image width={100} src={record.image} alt={record.title} />
            )}
          />
          <Column
            title="Rating"
            key="rating"
            render={(text, record) => (
              <span className="block whitespace-nowrap">
                {record.rating?.rate} ({record.rating?.count} votes)
              </span>
            )}
          />
          <Column
            title="Created At"
            key="createAt"
            render={(text, record) => (
              <span className="block whitespace-nowrap ">
                {today.toLocaleDateString("en-US", options)}
              </span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => <ModalUpdateProduct record={record} />}
          ></Column>
        </Table>
      ) : (
        <div>
          <h1>No Products</h1>
        </div>
      )}

      <div className="sticky bottom-0 bg-gray-300 p-2">
        <DeleteProduct />
      </div>
    </div>
  );
};
