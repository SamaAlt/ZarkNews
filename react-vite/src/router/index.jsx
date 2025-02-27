// react-vite/src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';

import HomePage from '../components/HomePage/HomePageFormPage';
import CategoryPage from '../components/ArticleViewer/ArticleViewerFormPage/CategoryPage';
import ArticleDetailPage from '../components/ArticleViewer/ArticleViewerFormPage/ArticleDetailPage';
import SubscriptionPage from '../components/Subscription/SubscriptionFormPage/SubscriptionPage';

import ProtectedRoute from './ProtectedRoute';
import LoginFormPage from '../components/Login/LoginFormPage';
import SignupFormPage from '../components/Signup/SignupFormPage';
import DashboardPage from '../components/Dashboard';
import ProfilePage from '../components/Profile';
import ArticleManagementPage from '../components/ArticleManagement/ArticleManagementFormPage/ArticleManagementPage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // HomePage
      {
        path: '/',
        element: <HomePage />,
      },

      // CategoryPage
      {
        path: 'category/national',
        element: <CategoryPage category="national" />,
      },
      {
        path: 'category/world',
        element: <CategoryPage category="world" />,
      },
      {
        path: 'category/business',
        element: <CategoryPage category="business" />,
      },
      {
        path: 'category/sports',
        element: <CategoryPage category="sports" />,
      },
      {
        path: 'category/entertainment',
        element: <CategoryPage category="entertainment" />,
      },
      {
        path: 'category/technology',
        element: <CategoryPage category="technology" />,
      },

      // ArticleDetailPage
      {
        path: 'articles/:id',
        element: <ArticleDetailPage />,
      },

      // SubscriptionPage
      {
        path: 'subscribe',
        element: <SubscriptionPage />,
      },

      // LoginFormPage (ProtectedRoute)
      {
        path: 'access/secure', // Less intuitive path for login
        element: (
          <ProtectedRoute>
            <LoginFormPage />
          </ProtectedRoute>
        ),
      },

      // SignupFormPage (ProtectedRoute)
      {
        path: 'access/register', // Less intuitive path for signup
        element: (
          <ProtectedRoute>
            <SignupFormPage />
          </ProtectedRoute>
        ),
      },

      // DashboardPage (ProtectedRoute)
      {
        path: 'admin/control-panel',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },

      // ProfilePage (ProtectedRoute)
      {
        path: 'user/settings',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      // ArticleManagementPage (ProtectedRoute)
      {
        path: 'internal/content-management',
        element: (
          <ProtectedRoute>
            <ArticleManagementPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);