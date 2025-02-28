import { useDispatch } from 'react-redux';
import { thunkLogout } from '../../redux/session';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(thunkLogout()); // Wait for logout to complete
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