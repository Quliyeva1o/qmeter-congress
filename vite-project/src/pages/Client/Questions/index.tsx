import React from "react";
import styles from "./index.module.scss";
import { Button } from "antd";
const Questions = () => {
  return (
    <div>
      <div className={styles.questions}>
        <div className={styles.heading}>
          <h1>“Komanda quruculuğu”</h1>
          <hr />
        </div>
        <p>Mövcud sual yoxdur</p>
        <Button type="primary">+ Sual verin</Button>
      </div>
    </div>
  );
};

export default Questions;
