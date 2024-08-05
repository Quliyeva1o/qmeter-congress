import React from "react";
import { Outlet } from "react-router-dom";
import styles from './index.module.scss'
import Header from "./header";

const Layout = () => {
  return (
      <div className={styles.layout}>
        <Header/>
        <Outlet />
      </div>
  );
};

export default Layout;
