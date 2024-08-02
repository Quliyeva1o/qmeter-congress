import React from "react";
import RootPage from "../pages/Client";
import Questions from "../pages/Client/Questions";
import Register from "../pages/Client/Register";
import Submit from "../pages/Client/Submit";

export const ROOT = [
    {
        path: "/",
        element: <RootPage/>,
        children: [
            { index: true, element: <Register /> },
            {
                path: "/submit",
                element: <Submit />,
            },
            {
                path: "/questions",
                element: <Questions />,
            },
         
        ],
    },
];