import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import NotFoundPage from '../components/NotFoundPage'; 
import HomePage from '../components/HomePage';
import SubscriptionPage from '../components/Subscription/SubscriptionFormPage/ReaderSubscribeFormPage';
import LoginFormPage from '../components/Login/LoginFormPage/LoginFormPage';
import SignupFormPage from '../components/Signup/SignupFormPage/SignupFormPage';
import LogoutButton from '../components/Logout/LogoutButton';
import EmployeePortal from '../components/EmployeePortal/EmployeePortalFormPage/EmployeePortal';

import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/Dashboard/DashboadFormPage/Dashboard';
import ProfileManagement from '../components/Profile/ProfileFormPage/ProfileManagement';
import ArticleManagement from '../components/ArticleManagement/ArticleManagementFormPage/ArticleManagement';
import MyArticles from '../components/ArticleManagement/ArticleManagementFormPage/MyArticles';
import AllArticles from '../components/ArticleManagement/ArticleManagementFormPage/AllArticles';
import ReaderSubscriptionsAnalytics from '../components/Subscription/SubscriptionFormPage/SubscriptionAnalytics';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/subscriptions/subscribe',
        element: <SubscriptionPage />,
      },
      {
        path: '/login',
        element: <LoginFormPage />,
      },
      {
        path: '/signup',
        element: <SignupFormPage />,
      },
      {
        path: '/logout',
        element: <LogoutButton />,
      },
      {
        path: '/employee-portal',
        element: <EmployeePortal />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/users',
            element: <ProfileManagement />,
          },
          {
            path: '/articles',
            element: <ArticleManagement />,
          },
          {
            path: '/subscriptions/Analytics',
            element: <ReaderSubscriptionsAnalytics />,
          },
          {
            path: '/articles/my-articles',
            element: <MyArticles />,
          },
          {
            path: '/articles/all-articles',
            element: <AllArticles />,
          },
        ],
      },
      // Catch-all route for invalid URLs
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);