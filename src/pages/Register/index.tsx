import React, { useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { FormProps } from "antd";
import { setRegisterData } from "../../redux/slices/registerSlice";
import { setVerificationCode } from "../../redux/slices/verificationSlice";
import Cookies from "js-cookie";
import { FormOption, UserTypes } from "../../types";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateVerificationCode = (): string => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    return code;
  };

  useEffect(() => {
    const token = Cookies.get("registrationToken");
    if (token) {
      navigate("/questions");
    }
  }, [navigate]);

  const onFinish: FormProps<UserTypes>["onFinish"] = (values) => {
    try {
      const code: string = generateVerificationCode();
      dispatch(setVerificationCode(code));
      dispatch(setRegisterData(values));
      message.success(
        `Registration successful! Your verification code is ${code}`
      );
      navigate("/submit");
    } catch (error) {
      message.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<UserTypes>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className={styles.register}>
        <div className={styles.heading}>
          <h1>Qeydiyyat</h1>
          <p>Məlumatları daxil edərək qeydiyyatdan keçin.</p>
        </div>
        <div className={styles.form}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {formOptions.map((option) => (
              <Form.Item
                key={option.name}
                name={option.name}
                rules={option.rules}
              >
                <Input placeholder={option.placeholder} />
              </Form.Item>
            ))}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;



const formOptions: FormOption[] = [
  {
    name: "name",
    placeholder: "Adınız/Soyadınız",
    rules: [
      { required: true, message: "Adınızı daxil edin!" },
      {
        pattern: /^(\w+(\s+\w+){1,2})$/,
        message: "Adınız/Soyadınız ən azı 2, ən çox 3 söz olmalıdır.",
      },
    ],
  },
  {
    name: "phone",
    placeholder: "Əlaqə nömrəsi",
    rules: [
      { required: true, message: "Əlaqə nömrəsini daxil edin!" },
      {
        pattern: /^\+\d+$/,
        message:
          "Əlaqə nömrəsi '+' işarəsi ilə başlamalıdır və rəqəm olmalıdır",
      },
      {
        validator: (_: any, value: string | any[]) => {
          if (value && value.length < 1) {
            return Promise.reject(
              new Error("Əlaqə nömrəsi ən azı 1 rəqəm olmalıdır.")
            );
          }
          if (value && value.length > 15) {
            return Promise.reject(
              new Error("Əlaqə nömrəsi ən çox 15 rəqəm olmalıdır.")
            );
          }
          return Promise.resolve();
        },
      },
    ],
  },
  {
    name: "email",
    placeholder: "Email",
    rules: [
      { required: true, message: "Email ünvanınızı daxil edin!" },
      {
        type: "email",
        message: "Düzgün bir email ünvanı daxil edin!",
      },
    ],
  },
];
