import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import ToIco from "../../../assets/images/icons/toIco";
import LikeIco from "../../../assets/images/icons/LikeIco";
import LikeBtn from "../../../assets/images/icons/LikeBtn";
const Questions = () => {
  const questions = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div className={styles.questions}>
      <div className={styles.heading}>
        <h1>“Komanda quruculuğu”</h1>
        <hr />
      </div>
      {questions.questions.length > 0 ? (
        questions.questions.map((question, idx) => (
          <div key={idx} className={styles.questionItem}>
            <div>
              <span>{question.from}</span> <ToIco />{" "}
              <span className={styles.to}>{question.to}</span>
              <p>{question.question}</p>
              <div className={styles.like}>
                <span>
                  <LikeIco />
                </span>
                <span className={styles.count}>{question.count}</span>
                <span>
                  <LikeBtn />
                </span>
                <span>Bəyən</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.nowords}>Mövcud sual yoxdur</p>
      )}
      <Link to="/askquestion">
        <Button className={styles.questBtn} type="primary">
          + Sual verin
        </Button>
      </Link>
    </div>
  );
};

export default Questions;
