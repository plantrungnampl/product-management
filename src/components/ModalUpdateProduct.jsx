import { Button, Form, Input, Modal, Select, Space, message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
export const ModalUpdateProduct = ({ record }) => {
  const { updateProduct, products, setFilteredProducts } =
    useContext(ProductContext);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    form.setFieldsValue({
      title: record.title,
      price: record.price,
      category: record.category,
      description: record.description,
      image: record.image,
    });
  }, [record, form]);

  const handleOk = async () => {
    try {
      form.setFieldValue(record);
      const values = await form.validateFields();
      const updateResponse = await updateProduct(record.id, values);
      if (updateResponse) {
        const newProductData = products.map((product) => {
          if (product.id === record.id) {
            return {
              ...product,
              title: values.title,
              price: values.price,
              description: values.description,
            };
          } else {
            return product;
          }
        });
        setFilteredProducts(newProductData);
      }
    } catch (error) {
      message.error("Update user failed: " + error.message);
    }
    setIsModalOpen(false);
  };
  return (
    <div>
      <Form form={form} layout="vertical" {...formItemLayout}>
        <Button type="primary" onClick={showModal}>
          Update
        </Button>
        <Modal
          title="Add users"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item
            label="name"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["title"]);
              }}
              title="title"
            />
          </Form.Item>

          <Form.Item
            label="Price"
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
              //   onChange={(value) =>
              //     setNewProduct({ ...newProduct, category: value })
              //   }
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

          <Form.Item
            label="Description"
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
              //   title="city"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["image"]);
              }}
            />
          </Form.Item>
        </Modal>
      </Form>
    </div>
  );
};
