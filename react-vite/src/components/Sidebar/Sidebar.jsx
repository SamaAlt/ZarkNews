// Sidebar.jsx
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/users">Profile Settings</Link>
        </li>
        <li>
          <Link to="/articles">Article Panel</Link>
        </li>
        <li>
          <Link to="/articles/my-articles">My Articles</Link>
        </li>
        <li>
          <Link to="/articles/all-articles">All Articles</Link>
        </li>
        <li>
          <Link to="/subscriptions/analytics">Read Analytics</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;