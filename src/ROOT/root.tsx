import React from "react";
import RootPage from "../pages/Client";
import Questions from "../pages/Client/Questions";
import Register from "../pages/Client/Register";
import Submit from "../pages/Client/Submit";
import AskQuestions from "../pages/Client/AskQuestions";
// import Success from "../pages/Client/Success";

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
            {
                path: "/askquestion",
                element: <AskQuestions />,
            },
            // {
            //     path: "/success",
            //     element: <Success />,
            // },
         
        ],
    },
];