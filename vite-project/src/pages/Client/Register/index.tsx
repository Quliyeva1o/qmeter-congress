import React from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useDispatch } from 'react-redux';
import { FormProps } from "antd";
import { setRegisterData } from "../../../redux/slices/registerSlice";
import { setVerificationCode } from "../../../redux/slices/verificationSlice";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid'; 

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateVerificationCode = (): string => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    return code;
  };

  const generateToken = (): string => {
    return uuidv4(); 
  };

  const onFinish: FormProps<FormValues>["onFinish"] = (values) => {
    try {
      console.log("Success:", values);
      const code:string = generateVerificationCode();
      const token = generateToken();
      
      Cookies.set('registrationToken', token, { expires: 1 }); 

      dispatch(setVerificationCode(code)); 
      dispatch(setRegisterData(values)); 
      message.success(`Registration successful! Your verification code is ${code}`);
      navigate("/submit"); 
    } catch (error) {
      message.error('Registration failed. Please try again.');
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<FormValues>["onFinishFailed"] = (errorInfo) => {
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

interface FormValues {
  name: string;
  phone: string;
  email: string;
}

interface FormOption {
  name: keyof FormValues;
  placeholder: string;
  rules: any[];
}

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
        pattern: /^\+\d{1,15}$/,
        message: "Əlaqə nömrəsi '+' işarəsi ilə başlamalıdır və 1-15 rəqəm içerməlidir.",
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
