import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { setRegisterData } from "../../../redux/slices/registerSlice";
import Cookies from 'js-cookie';
import type { GetProps } from "antd";
import styles from './index.module.scss'

type OTPProps = GetProps<typeof Input.OTP>;

const Submit: React.FC = () => {
  const loggedinUser = useSelector((state: RootState) => state.register);
  const [countdown, setCountdown] = useState<number>(30);
  const [isCounting, setIsCounting] = useState<boolean>(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verificationCode = useSelector(
    (state: RootState) => state.verification.code
  );

  useEffect(() => {
    let timer: number;

    if (isCounting) {
      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCounting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCounting]);

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const handleResend = () => {
    setCountdown(30);
    setIsCounting(true);
  };

  const onFinish = (values: any) => {
    console.log(values);
    if (values.otp === verificationCode) {
    
      dispatch(setRegisterData(loggedinUser));
      navigate('/questions');
    } else {
      form.setFields([
        {
          name: "otp",
          errors: ["Verification code is incorrect!"],
        },
      ]);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <div className={styles.submit}>
        <div className={styles.heading}>
          <h1>Kodu daxil edin</h1>
          <p>Telefonunuza aktivləşdirmə kodunu göndərildi {loggedinUser.phone}</p>
        </div>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Please input your OTP!",
              },
              {
                pattern: /^\d+$/,
                message: "OTP must be a number!",
              },
              {
                len: 4,
                message: "OTP must be 4 digits long!",
              },
            ]}
          >
            <Input.OTP length={4} formatter={(num) => num} {...sharedProps} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Təsdiqlə
            </Button>
          </Form.Item>
        </Form>
        <p className={styles.code}>
          {isCounting ? (
            `Kodu yenidən göndər  00:${countdown.toString().padStart(2, "0")}`
          ) : (
            <Button onClick={handleResend}>Yenidən göndər</Button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Submit;
