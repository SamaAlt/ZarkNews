import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { ArticleProvider } from "../context/ArticleContext";

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
        element: (
          <ArticleProvider> 
            <HomePage />
          </ArticleProvider>
        ),
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
            element: (
              <ArticleProvider> 
                <ArticlePanel />
              </ArticleProvider>
            ),
          },
          {
            path: '/articles/edit/:id',
            element: (
              <ArticleProvider> 
                <ArticlePanel />
              </ArticleProvider>
            ),
          },
          {
            path: '/articles/my-articles',
            element: (
              <ArticleProvider> 
                <MyArticles />
              </ArticleProvider>
            ),          },
          {
            path: '/articles/all-articles',
            element: (
              <ArticleProvider> 
                <AllArticles />
              </ArticleProvider>
            ),
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
        element: (
          <ArticleProvider> 
            <NationalNewsPage />
          </ArticleProvider>
        ),      },
      {
        path: '/news/world',
        element: (
          <ArticleProvider> 
            <WorldNewsPage />
          </ArticleProvider>
        ),      },
      {
        path: '/news/business',
        element: (
          <ArticleProvider> 
            <BusinessNewsPage />
          </ArticleProvider>
        ),      },
      {
        path: '/news/sports',
        element: (
          <ArticleProvider> 
            <SportsNewsPage />
          </ArticleProvider>
        ),      },
      {
        path: '/news/entertainment',
        element: (
          <ArticleProvider> 
            <EntertainmentNewsPage />
          </ArticleProvider>
        ),      },
      {
        path: '/news/technology',
        element: (
          <ArticleProvider> 
            <TechnologyNewsPage />
          </ArticleProvider>
        ),      },
      // Catch-all route for invalid URLs
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);