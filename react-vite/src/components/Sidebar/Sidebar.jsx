// Sidebar.jsx
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
       <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/articles/panel">Article Panel</Link>
        </li>
        <li>
          <Link to="/articles/my-articles">My Articles</Link>
        </li>
        <li>
          <Link to="/articles/archive">Archieves</Link>
        </li>
        <li>
          <Link to="/articles/all-articles">All Articles</Link>
        </li>
        <li>
          <Link to="/users">Profile Settings</Link>
        </li>
        <li>
          <Link to="/subscriptions/analytics">Zark Readers</Link>
        </li>      </ul>
    </div>
  );
};

export default Sidebar;