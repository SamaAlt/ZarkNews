import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import logo from './logo.webp'; // Adjust the path to your logo file
import ProfileButton from '../Profile/ProfileButton'; // Import the ProfileButton component
import './Navigation.css'; // Import the CSS file

export default function Navigation({ user }) {
  const location = useLocation(); // Get the current route

  // Conditionally render the ProfileButton
  const showProfileButton = user || location.pathname === '/employee-portal';

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" /> 
        </Link>
      </div>
      <div className='nav-links'>
        <Link to="/news/national" className={isActive('/news/national') ? 'active' : ''}>National</Link>
        <Link to="/news/world" className={isActive('/news/world') ? 'active' : ''}>World</Link>
        <Link to="/news/business" className={isActive('/news/business') ? 'active' : ''}>Business</Link>
        <Link to="/news/sports" className={isActive('/news/sports') ? 'active' : ''}>Sports</Link>
        <Link to="/news/entertainment" className={isActive('/news/entertainment') ? 'active' : ''}>Entertainment</Link>
        <Link to="/news/technology" className={isActive('/news/technology') ? 'active' : ''}>Technology</Link>
        <Link to="/subscriptions/subscribe" className={isActive('/subscriptions/subscribe') ? 'active' : ''}>Subscribe</Link>

      </div>
      <div>
        {/* <Link to="/subscriptions/subscribe" className={isActive('/subscriptions/subscribe') ? 'active' : ''}>Subscribe</Link> */}
        <Link to="/login" className={isActive('/login') ? 'active' : ''}>DEMO USER</Link>        

      </div>
      <div>
        {user && (user.role === 'editor' || user.role === 'admin') && (
          <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
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