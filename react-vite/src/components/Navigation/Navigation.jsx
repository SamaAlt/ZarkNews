import { Link, useLocation } from 'react-router-dom'; // Import useLocation
// import logo from './logo.png'; // Adjust the path to your logo file
import ProfileButton from '../Profile/ProfileButton'; // Import the ProfileButton component

export default function Navigation({ user }) {
  const location = useLocation(); // Get the current route

  // Conditionally render the ProfileButton
  const showProfileButton = user || location.pathname === '/employee-portal';

  return (
    <nav>
      <div>
        {/* <Link to="/">
          <img src={logo} alt="Logo" className="logo" /> 
        </Link> */}
      </div>
      <div>
        <Link to="/news/national">National</Link>
        <Link to="/news/world">World</Link>
        <Link to="/news/business">Business</Link>
        <Link to="/news/sports">Sports</Link>
        <Link to="/news/entertainment">Entertainment</Link>
        <Link to="/news/technology">Technology</Link>
      </div>
      <div>
        <Link to="/subscriptions/subscribe">Subscribe</Link>
      </div>
      <div>
        {user && (user.role === 'editor' || user.role === 'admin') && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
      {/* Conditionally render the ProfileButton */}
      {showProfileButton && (
        <div className="profile-button-container">
          <ProfileButton />
        </div>
      )}
    </nav>
  );
}