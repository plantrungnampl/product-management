import { useContext } from "react";
import { Button, Form, Input, Typography } from "antd";
import { AuthContext } from "../../context/AuthContextProvider";

export const Signin = () => {
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  const { login, onFinishFailed } = useContext(AuthContext);

  return (
    <>
      <Form
        form={form}
        className="bg-slate-400 rounded-2xl p-5 w-2/4"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={login}
        onFinishFailed={onFinishFailed}
      >
        <Typography.Title
          level={4}
          className="text-center text-black font-bold"
        >
          Login
        </Typography.Title>
        <Form.Item
          className="font-bold"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your Email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="font-bold"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            {
              max: 8,
              message: "Password must be at max 8 characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
