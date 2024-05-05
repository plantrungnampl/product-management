import { Button, Form, Input, Modal, Space, message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ContextUserProvider } from "../context/ContextProvider";
import { v4 as uuidv4 } from "uuid";
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
export const ModalUpdateUsers = ({ record }) => {
  const {
    updateUser,
    userData,
    setUserData,
    filteredDataUsers,
    setFilteredDataUsers,
  } = useContext(ContextUserProvider);

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
      firstname: record.name?.firstname,
      lastname: record.name?.lastname,
      email: record.email,
      address: record.address?.city,
      phone: record.phone,
      username: record.username,
    });
  }, [record, form]);

  const handleOk = async () => {
    try {
      form.setFieldValue(record);
      const values = await form.validateFields();
      const updateResponse = await updateUser(record.id, values);
      if (updateResponse) {
        const newUserData = userData.map((user) => {
          if (user.id === record.id) {
            return {
              ...user,
              name: {
                ...user.name,
                firstname: values.firstname,
                lastname: values.lastname,
              },
              email: values.email,
              address: {
                ...user.address,
                city: values.address,
              },
              phone: values.phone,
              username: values.username,
            };
          } else {
            return user;
          }
        });
        setFilteredDataUsers(newUserData);
      }
    } catch (error) {
      message.error("Update user failed: " + error.message);
    }
    setIsModalOpen(false);
  };
  console.log("fillter", filteredDataUsers);
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
            label="Firstname"
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["firstname"]);
              }}
              title="firstname"
            />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["lastname"]);
              }}
              title="lastname"
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["username"]);
              }}
              title="username"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["email"]);
              }}
              title="email"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["address"]);
              }}
              //   title="city"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input
              onBlur={() => {
                form.validateFields(["phone"]);
              }}
              title="phone"
            />
          </Form.Item>
        </Modal>
      </Form>
    </div>
  );
};
