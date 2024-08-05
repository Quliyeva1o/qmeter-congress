import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { toggleLike } from "../../store/slices/questionsSlice";
import ToIco from "../../assets/images/icons/toIco";
import LikeIco from "../../assets/images/icons/LikeIco";
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import styles from "./index.module.scss";
import Cookies from "js-cookie";

const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);
  const navigate = useNavigate();
  const [likedQuestions, setLikedQuestions] = useState<number[]>([]);



  useEffect(() => {
    const token = Cookies.get("registrationToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLikeClick = (index: number) => {
    dispatch(toggleLike(index));
    setLikedQuestions((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className={styles.questions}>
      <div className={styles.heading}>
        <h1>“Komanda quruculuğu”</h1>
        <hr />
      </div>
      {questions.questions.length > 0 ? (
        questions.questions.map((question, idx) => (
          <div
            key={idx}
            className={styles.questionItem}
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div>
              <span>{question.from}</span> <ToIco />{" "}
              <span className={styles.to}>{question.to}</span>
              <div>
                <p>{question.question}</p>
              </div>
              <div className={styles.like}>
                <span>
                  <LikeIco />
                </span>
                <span className={styles.count}>{question.count}</span>
                <Button
                  onClick={() => handleLikeClick(idx)}
                  type="link"
                  icon={likedQuestions.includes(idx) ? <LikeFilled style={{ color: '#007AFF' }} /> : <LikeOutlined />}
                  className={likedQuestions.includes(idx) ? styles.liked : ''}
                >
                  Bəyən
                </Button>
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
