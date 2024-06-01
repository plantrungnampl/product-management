import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductContext } from "../context/ContextProductProvider";
uuidv4();
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
export const ModalCreateProducts = () => {
  const { addProduct, setProducts, products } = useContext(ProductContext);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: uuidv4(),
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: {},
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    const productToAdd = {
      ...newProduct,
      rating: {
        rate: 1000,
        count: 541,
      },
    };

    try {
      await addProduct(productToAdd);
      // Update the products state with the new product
      setProducts([...products, productToAdd]);
    } catch (error) {
      message.error("Add product failed: " + error.message);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files");
    }
    return isImage || Upload.LIST_IGNORE;
  };
  //Add file upload
  const dummyImageUrl = "https://via.placeholder.com/150";

  const handleFileChange = (info) => {
    setNewProduct({ ...newProduct, image: dummyImageUrl });
    message.success("Image uploaded successfully (simulated)");
  };

  console.log("newProduct", newProduct);
  return (
    <div>
      <Form form={form} layout="vertical" {...formItemLayout}>
        <Button type="primary" onClick={showModal}>
          Add Products
        </Button>
        <Modal
          title="Add users"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item
            label="Name"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["title"]);
              }}
              title="title"
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["price"]);
              }}
              title="price"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["description"]);
              }}
              title="description"
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your category!",
                type: "category",
              },
            ]}
          >
            <Select
              onBlur={() => {
                form.validateFields(["category"]);
              }}
              onChange={(value) =>
                setNewProduct({ ...newProduct, category: value })
              }
            >
              {/* Replace these options with your actual categories */}
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="books">Books</Select.Option>
              <Select.Option value="men's clothing">Man Clothing</Select.Option>
              <Select.Option value="jewelery">jewelery</Select.Option>
              <Select.Option value="women's clothing">
                women clothing
              </Select.Option>
            </Select>
          </Form.Item>
          {/* 
          <Form.Item
            label="rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your rating!",
              },
            ]}
          >
            {newProduct.rating.rate}
            {newProduct.rating.count}
          </Form.Item> */}

          <Form.Item
            label="Upload images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
            >
              {newProduct.image ? (
                <img
                  src={newProduct.image}
                  alt="product"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Modal>
      </Form>
    </div>
  );
};
