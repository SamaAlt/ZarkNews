import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Add useLocation
import { useDispatch, useSelector } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer'; // Import the Footer component
import Sidebar from '../components/Sidebar/Sidebar'; // Import the Sidebar component

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const location = useLocation(); // Get the current route location

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/users',
    '/articles/panel',
    '/articles/archive',
    '/articles/edit/:id',
    '/articles/my-articles',
    '/articles/all-articles',
    '/subscriptions/analytics',
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ModalProvider>
        <Navigation user={user} />
        <div className="app-container">
          {isProtectedRoute && <Sidebar />} {/* Conditionally render Sidebar */}
          <div className={`main-content ${isProtectedRoute ? 'with-sidebar' : ''}`}>
            {isLoaded && <Outlet />} {/* Outlet will render the main content */}
          </div>
        </div>
        <Footer />
        <Modal />
      </ModalProvider>
    </>
  );
}