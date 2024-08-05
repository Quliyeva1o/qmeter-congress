import React from "react";
import Logo from "../assets/logo/logo";
import { Outlet } from "react-router-dom";
import styles from './index.module.scss'

const Layout = () => {
  return (
    <>
      <div className={styles.layout}>
        <Logo />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
