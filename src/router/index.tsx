import { Navigate, useRoutes } from 'react-router-dom';
import React, { lazy } from 'react';

const AboutPage = lazy(() => import('../pages/about/index'));
const ChatPage = lazy(() => import('../pages/chat/index'));

export const rootRouter = [
  {
    path: '/',
    element: <Navigate to="/chat" />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
];

const Router = () => {
  return useRoutes(rootRouter);
};

export default Router;
