// src/router/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.session.user);

  if (!user) {
     return <Navigate to="/login" replace />;
  }

   return <Outlet />;
};

export default ProtectedRoute;