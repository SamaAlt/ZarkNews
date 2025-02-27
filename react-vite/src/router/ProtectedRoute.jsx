// react-vite/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.session.user);

  // Only allow access if the user is an editor or admin
  if (!user || (user.role !== 'editor' && user.role !== 'admin')) {
    return <Navigate to="/" />;
  }

  return children;
}