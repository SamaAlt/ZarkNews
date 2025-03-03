import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/subscriptions/analytics" className="sidebar-link">Zark Readers</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/articles/panel" className="sidebar-link">Article Panel</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/articles/my-articles" className="sidebar-link">My Articles</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/articles/archive" className="sidebar-link">Archives</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/articles/all-articles" className="sidebar-link">All Articles</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/users" className="sidebar-link">Profile Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;