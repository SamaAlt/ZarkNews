import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLogout } from '../../redux/session';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  // Log the user state to ensure it updates correctly
  useEffect(() => {
    console.log('User state:', user);
  }, [user]);

  const handleLogout = async () => {
    try {
      console.log('Dispatching thunkLogout...');
      await dispatch(thunkLogout()); // Wait for logout to complete
      console.log('Logout successful. Navigating to /');
      navigate('/'); // Redirect to the home page or login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;