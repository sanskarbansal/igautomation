import React, { lazy } from 'react';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Login from '../views/authentication/auth/Login';
import Register from '../views/authentication/auth/Register';
import ConnectWithInstagram from '../views/authentication/connect/ConnectWithInstagram';
import DashboardHome from '../views/dashboard/DashboardHome';
import Automation from '../views/dashboard/Automation';
import Contacts from '../views/dashboard/Contacts';
import Talk from '../views/dashboard/Talk';
import FullLayout from '../layouts/full/FullLayout';
import FAQ from '../components/frontend-pages/homepage/faq';

// Only keep the Homepage route for now
const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));

const Router = [
  {
    path: '/',
    element: <Homepage />,
  },
  { path: 'auth/login', element: <Login /> },
  { path: 'auth/register', element: <Register /> },
  { path: 'connect', element: <ConnectWithInstagram /> },
  {
    path: 'dashboard',
    element: <FullLayout />,
    children: [
      { path: '', element: <DashboardHome /> },
      { path: 'automation', element: <Automation /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'talk', element: <Talk /> },
    ],
  },
];

export default Router;
