import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import {  routes } from "./routes/routes";
import React from "react";
import store from "./redux/store";

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
