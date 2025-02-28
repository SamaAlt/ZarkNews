import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import LoginFormPage from '../components/Login/LoginFormPage/LoginFormPage';
import SignupFormPage from '../components/Signup/SignupFormPage/SignupFormPage';
import HomePage from '../components/HomePage/HomePageFormPage';
import CategoryPage from '../components/ArticleViewer/ArticleViewerFormPage/CategoryPage';
import ArticleDetailPage from '../components/ArticleViewer/ArticleViewerFormPage/ArticleDetailPage';
import SubscriptionPage from '../components/Subscription/SubscriptionFormPage/SubscriptionPage';
import EmployeePortalPage from '../components/EmployeePortal/EmployeePortalFormPage/EmployeePortalPage';
import DashboardPage from '../components/Dashboard/DashboadFormPage/DashboardFormPage';
import ProfilePage from '../components/Profile/ProfileFormPage/ProfileFormPage';
import ArticleManagementPage from '../components/ArticleManagement/ArticleManagementFormPage/ArticleManagementPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Public routes
      {
        path: '/login',
        element: <LoginFormPage />,
      },
      {
        path: '/signup', 
        element: <SignupFormPage />,
      },
      {
        path: '/', 
        element: <HomePage />,
      },
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
      {
        path: 'articles/:id',
        element: <ArticleDetailPage />,
      },
      {
        path: 'subscribe', // Corresponds to the backend route: POST /subscriptions
        element: <SubscriptionPage />,
      },

      // Protected routes
      {
        element: <ProtectedRoute />, // Wrapper for protected routes
        children: [
          {
            path: 'internal/employee-portal', 
            element: <EmployeePortalPage />,
          },
          {
            path: 'admin/control-panel', 
            element: <DashboardPage />,
          },
          {
            path: 'user/settings', // Corresponds to the backend route: GET /users/<int:id> and PUT /users/<int:id>
            element: <ProfilePage />,
          },
          {
            path: 'internal/content-management', // Corresponds to the backend route: GET /articles, POST /articles, PUT /articles/<int:id>, DELETE /articles/<int:id>
            element: <ArticleManagementPage />,
          },
        ],
      },
    ],
  },
]);