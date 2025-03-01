import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';

import NotFoundPage from '../components/NotFoundPage'; 
import HomePage from '../components/HomePage';

import Subscribe from '../components/Subscription/SubsciptionManagement/Subscribe';
import ManageSubscription from '../components/Subscription/SubsciptionManagement/ManageSubscription';
import SubscriptionsAnalytics from '../components/Subscription/SubscriptionAnalytics/SubscriptionsAnalytics';

import LoginFormPage from '../components/Login/LoginFormPage';
import SignupFormPage from '../components/Signup/SignupFormPage';
import LogoutButton from '../components/Logout/LogoutButton';
import EmployeePortal from '../components/EmployeePortal/EmployeePortal';

import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/Dashboard/Dashboard';
import ProfileSettings from '../components/Profile/ProfileSetings';
import ArticlePanel from '../components/ArticleManagement/ArticlePanel';
import MyArticles from '../components/ArticleManagement/MyArticles';
import AllArticles from '../components/ArticleManagement/AllArticles';

import NationalNewsPage from '../components/NationalNewsPage';
import WorldNewsPage from '../components/WorldNewsPage';
import BusinessNewsPage from '../components/BusinessNewsPage';
import SportsNewsPage from '../components/SportsNewsPage';
import EntertainmentNewsPage from '../components/EntertainmentNewsPage';
import TechnologyNewsPage from '../components/TechnologyNewsPage';

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
        element: <Subscribe />,
      },
      {
        path: '/subscriptions/manage/:subscription_id',
        element: <ManageSubscription />,
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
            element: <ProfileSettings />,
          },
          {
            path: '/articles/panel',
            element: <ArticlePanel />,
          },
          {
            path: '/articles/my-articles',
            element: <MyArticles />,
          },
          {
            path: '/articles/all-articles',
            element: <AllArticles />,
          },
          {
            path: '/subscriptions/analytics',
            element: <SubscriptionsAnalytics />,
          }
        ],
      },
      // Add routes for each news section
      {
        path: '/news/national',
        element: <NationalNewsPage />,
      },
      {
        path: '/news/world',
        element: <WorldNewsPage />,
      },
      {
        path: '/news/business',
        element: <BusinessNewsPage />,
      },
      {
        path: '/news/sports',
        element: <SportsNewsPage />,
      },
      {
        path: '/news/entertainment',
        element: <EntertainmentNewsPage />,
      },
      {
        path: '/news/technology',
        element: <TechnologyNewsPage />,
      },
      // Catch-all route for invalid URLs
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);