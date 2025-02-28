// src/router/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.session.user);

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if the user is authenticated
  return <Outlet />;
};

export default ProtectedRoute;