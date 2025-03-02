import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <ul>
            <ul><Link to="/users">Profile Setings</Link></ul>
            <ul><Link to="/articles/panel">Article Panel</Link></ul>
            <ul><Link to="/articles/my-articles">My Articles</Link></ul>
            <ul><Link to="/articles/all-articles">All Articles</Link></ul>
            <ul><Link to="/subscriptions/analytics">Reader Analytics</Link></ul>          
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