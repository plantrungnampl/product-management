import { Button, Form, Input, Modal, Space, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
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
export const ModalCreateUsers = () => {
  const { setUserData, userData, addUsers } = useContext(ContextUserProvider);
  const [newUser, setNewUser] = useState({
    address: {
      geolocation: {
        lat: "30.24788",
        long: "-20.545419",
      },
      city: "",
      street: "oak lawn ave",
      number: 526,
      zipcode: "10256-4532",
    },
    id: uuidv4(),
    name: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "test 123",
    phone: "",
    username: "",
  });
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    try {
      addUsers(newUser);
      setUserData([...userData, newUser]);
      form.resetFields();

      setIsModalOpen(false);
    } catch (error) {
      message.error("Add user failed");
    }
  };

  const handleChange = (e, field, nestedField) => {
    if (nestedField) {
      setNewUser({
        ...newUser,
        [field]: { ...newUser[field], [nestedField]: e.target.value },
      });
    } else {
      setNewUser({ ...newUser, [field]: e.target.value });
    }
  };
  console.log("newUser", newUser);
  return (
    <div>
      <Form form={form} layout="vertical" {...formItemLayout}>
        <Button type="primary" onClick={showModal}>
          Add users
        </Button>
        <Modal
          title="Add users"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item
            label="firstname"
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
              value={newUser.name.firstname}
              onChange={(e) => handleChange(e, "name", "firstname")}
            />
          </Form.Item>

          <Form.Item
            label="lastname"
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
              value={newUser.name.lastname}
              onChange={(e) => handleChange(e, "name", "lastname")}
            />
          </Form.Item>

          <Form.Item
            label="username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              onChange={(e) => handleChange(e, "username")}
              onBlur={() => {
                form.validateFields(["username"]);
              }}
              title="username"
              value={newUser.username}
            />
          </Form.Item>

          <Form.Item
            label="email"
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
              onChange={(e) => handleChange(e, "email")}
              value={newUser.email}
              onBlur={() => {
                form.validateFields(["email"]);
              }}
              title="email"
            />
          </Form.Item>

          <Form.Item
            label="address"
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
              title="city"
              onChange={(e) => handleChange(e, "address", "city")}
              value={newUser.address?.city}
            />
          </Form.Item>

          <Form.Item
            label="phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input
              value={newUser.phone}
              onChange={(e) => handleChange(e, "phone")}
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
