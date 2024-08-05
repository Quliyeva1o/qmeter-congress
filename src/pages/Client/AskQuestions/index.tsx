import React,{useEffect} from "react";
import { Button, Form, Select, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../redux/slices/questionsSlice";
import styles from "./index.module.scss";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


const AskQuestions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedinUser = useSelector((state: RootState) => state.register.name);
  useEffect(() => {
    const token = Cookies.get("registrationToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  const onFinish = (values: any) => {
    dispatch(
      addQuestion({
        from: loggedinUser,
        to: values.user,
        question: values.question,
      })
    );

    Swal.fire({
      icon: "success",
      title: "Sualınız qeydə alındı",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/questions");
    });
  };

  return (
    <div className={styles.ask}>
      <h2>Sualınız</h2>
      <Form
        className={styles.form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="user"
          rules={[{ required: true, message: "Please select a user!" }]}
        >
          <Select
            className={styles.select}
            showSearch
            placeholder="Sualı ünvanladığınız şəxsi seçin:"
            optionFilterProp="label"
            options={users}
          />
        </Form.Item>

        <Form.Item
          className={styles.textarea}
          name="question"
          rules={[{ required: true, message: "Please enter your question!" }]}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            placeholder="disable resize"
            style={{ resize: "none" }}
          />
        </Form.Item>

        <div className={styles.btnDiv}>
          <Button
            type="primary"
            className={styles.secondary}
            onClick={() => navigate(-1)}
          >
            Geri
          </Button>
          <Button type="primary" className={styles.primary} htmlType="submit">
            Tamamla
          </Button>
        </div>
      </Form>
    </div>
  );
};

interface UserOption {
  value: string;
  label: string;
}

const users: UserOption[] = [
  { value: "Ümumi", label: "Ümumi" },
  { value: "Moderator-Vüsal Səlimov", label: "Moderator-Vüsal Səlimov" },
  { value: "Altay Cəfərov", label: "Altay Cəfərov" },
  { value: "Aygün Əliyeva", label: "Aygün Əliyeva" },
  { value: "Vüqar Abbasov", label: "Vüqar Abbasov" },
  { value: "Səlim İlhamlı", label: "Səlim İlhamlı" },
  { value: "Faiq Abdullayev", label: "Faiq Abdullayev" },
];

export default AskQuestions;
