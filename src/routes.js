import React from 'react';
import Dashboard from './pages/dashboard';
import Login from './pages/login/login';
import DashBoardLayout from './layouts/DashBoardLayout';
import Team from './pages/team';
import Invoices from './pages/invoices';
import Form from './pages/form';
import Calendar from './pages/calendar';
import Pie from './pages/pie';
import FAQ from './pages/faq';
import Geography from './pages/geography';
import Users from './pages/users';
import Workers from './pages/workers';
import ProcessLot from './pages/processLot';
const routes = () => [
  {
    path: '/',
    element: <DashBoardLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/team', element: <Team /> },
      { path: '/processLot', element: <ProcessLot /> },
      { path: '/invoices', element: <Invoices /> },
      { path: '/form', element: <Form /> },
      { path: '/workers', element: <Workers /> },
      { path: '/pie', element: <Pie /> },
      { path: '/users', element: <Users /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/geography', element: <Geography /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default routes;
