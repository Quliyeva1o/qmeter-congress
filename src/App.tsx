import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import {  routes } from "./routes/index";
import React from "react";
import store from "./store/store";

function App() {
  const rooter = createBrowserRouter(routes);
  return (
    <>
    
      <Provider store={store}>
        <RouterProvider router={rooter} />
      </Provider>
    </>
  );
}

export default App;
