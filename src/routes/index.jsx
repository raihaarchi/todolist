import React from 'react';
import MainLayout from '../layout/MainLayout';
import EmptyLayout from '../layout/EmptyLayout';

const Main = React.lazy(() => import('../pages/Main'));
const Completed = React.lazy(() => import('../pages/Completed'));
const Error = React.lazy(() => import('../pages/Error'));
const routes = [
  {
    exact: true,
    path: '/',
    layout: MainLayout,
    Component: Main,
  },
  {
    exact: false,
    path: '/completed-tasks',
    layout: MainLayout,
    Component: Completed,
  },
  {
    exact: false,
    path: '*',
    layout: EmptyLayout,
    Component: Error,
  },
];

export default routes;
