import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { ArticleProvider } from "../context/ArticleContext";
import { FilterProvider } from "../context/FilterContext";

import NotFoundPage from '../components/NotFoundPage'; 
import HomePage from '../components/HomePage';
import ArticleReader from '../components/ArticleManagement/ArticleReader';

import Subscribe from '../components/Subscription/SubsciptionManagement/Subscribe';
import ManageSubscription from '../components/Subscription/SubsciptionManagement/ManageSubscription';
import SubscriptionsAnalytics from '../components/Subscription/SubscriptionAnalytics/SubscriptionsAnalytics';

import LoginFormPage from '../components/Login/LoginFormPage';
import SignupFormPage from '../components/Signup/SignupFormPage';
import LogoutButton from '../components/Logout/LogoutButton';
import EmployeePortal from '../components/EmployeePortal/EmployeePortal';

import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/Dashboard/Dashboard';
import ProfileSettings from '../components/Profile/ProfileSettings';
import ArticlePanel from '../components/ArticleManagement/ArticlePanel';
import MyArticles from '../components/ArticleManagement/MyArticles';
import AllArticles from '../components/ArticleManagement/AllArticles';

import NationalNewsPage from '../components/Sections/NationalNewsPage';
import WorldNewsPage from '../components/Sections/WorldNewsPage';
import BusinessNewsPage from '../components/Sections/BusinessNewsPage';
import SportsNewsPage from '../components/Sections/SportsNewsPage';
import EntertainmentNewsPage from '../components/Sections/EntertainmentNewsPage';
import TechnologyNewsPage from '../components/Sections/TechnologyNewsPage';
import Archive from '../components/Archive/Archive';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <FilterProvider> 
            <HomePage />
          </FilterProvider>
        ),
      },
      {
        path: '/articles/:id', // Add this route for individual articles
        element: <ArticleReader />
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
            path: '/articles/archive',
            element: (
                <Archive />
            ),      
          },
          {
            path: '/subscriptions/analytics',
            element: <SubscriptionsAnalytics />,
          }
        ],
      },
       {
        path: '/news/national',
        element: (
          <FilterProvider> 
            <NationalNewsPage />
          </FilterProvider>
        ),      },
      {
        path: '/news/world',
        element: (
          <FilterProvider> 
            <WorldNewsPage />
          </FilterProvider>
        ),      },
      {
        path: '/news/business',
        element: (
          <FilterProvider> 
            <BusinessNewsPage />
          </FilterProvider>
        ),      },
      {
        path: '/news/sports',
        element: (
          <FilterProvider> 
            <SportsNewsPage />
          </FilterProvider>
        ),      },
      {
        path: '/news/entertainment',
        element: (
          <FilterProvider> 
            <EntertainmentNewsPage />
          </FilterProvider>
        ),      },
        {
          path: '/news/technology',
          element: (
            <FilterProvider> 
            <TechnologyNewsPage />
          </FilterProvider>
          ),      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);