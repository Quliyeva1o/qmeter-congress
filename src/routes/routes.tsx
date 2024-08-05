import React from 'react';
import Register from '../pages/Register';
import Submit from '../pages/Submit';
import Questions from '../pages/Questions';
import AskQuestions from '../pages/AskQuestions';

export const rootRoutes = [
    { index: true, element: <Register /> },
    { path: '/submit', element: <Submit /> },
    { path: '/questions', element: <Questions /> },
    { path: '/askquestion', element: <AskQuestions /> },
  ];