import { Outlet, Link } from 'react-router-dom';
import ProfileButton from '../../ProfileButton';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <ProfileButton />
      </nav>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <ul>
            <li><Link to="/users">Profile Management</Link></li>
            <li><Link to="/articles">Article Management</Link></li>
            <li><Link to="/subscriptions/Analytics">Subscriber Analytics</Link></li>
            <li><Link to="/articles/my-articles">My Articles</Link></li>
            <li><Link to="/articles/all-articles">All Articles</Link></li>
          </ul>
        </aside>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;