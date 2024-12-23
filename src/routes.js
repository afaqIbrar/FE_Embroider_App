import React from 'react';
import Dashboard from './pages/dashboard';
import Login from './pages/login/login';
import DashBoardLayout from './layouts/DashBoardLayout';
import Work from './pages/work';
import Users from './pages/users';
import Workers from './pages/workers';
import ProcessLot from './pages/processLot';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import WorKList from './pages/workList';
import Accounts from './pages/accounts';
import AccountList from './pages/accountList'

const routes = (user) => [
  {
    path: 'routing',
    element: <DashBoardLayout />,
    children: [
      {
        path: 'dashboard',
        element: user ? <Dashboard /> : <Navigate to="/login" />
      },
      {
        path: 'processLot',
        element: user ? <ProcessLot /> : <Navigate to="/login" />
      },
      { path: 'work', element: user ? <Work /> : <Navigate to="/login" /> },
      { path: 'account', element: user ? <Accounts /> : <Navigate to="/login" /> },
      {
        path: 'account/:workerId',
        element: user ? <AccountList /> : <Navigate to="/login" />
      },
      {
        path: 'workers',
        element: user ? <Workers /> : <Navigate to="/login" />
      },
      {
        path: 'work/:workerId',
        element: user ? <WorKList /> : <Navigate to="/login" />
      },
      { path: 'users', element: user ? <Users /> : <Navigate to="/login" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: '/',
        element: user ? (
          <Navigate to="routing/processLot" />
        ) : (
          <Navigate to="/login" />
        )
      }
    ]
  }
];

export default routes;
