import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <div className="grid-container">
            <Link to="/users" className="grid-item">Profile Settings</Link>
            <Link to="/articles/panel" className="grid-item">Article Panel</Link>
            <Link to="/articles/my-articles" className="grid-item">My Articles</Link>
            <Link to="/articles/all-articles" className="grid-item">All Articles</Link>
            <Link to="/subscriptions/analytics" className="grid-item">Reader Analytics</Link>
          </div>
        </aside>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;