import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AskQuestionForm from "./components/Form";

const AskQuestions: React.FC = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = Cookies.get("registrationToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div className={styles.ask}>
      <h2>Sualınız</h2>
      <AskQuestionForm />
    </div>
  );
};


export default AskQuestions;
