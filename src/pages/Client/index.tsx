import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layout/Header";
import styles from './index.module.scss'
const RootPage = () => {
  return (
    <>
      <div className={styles.root}>
      <Header />
      <Outlet />
      </div>
    </>
  );
};

export default RootPage;
