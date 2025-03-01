// react-vite/src/components/Navigation/Navigation.jsx
import { Link } from 'react-router-dom';

export default function Navigation({ user }) {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
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
        {/* Subscription Link */}
        <Link to="/subscriptions/subscribe">Subscribe</Link>
      </div>
      <div>
        {/* Dashboard Link (Only for editors/admins) */}
        {user && (user.role === 'editor' || user.role === 'admin') && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
    </nav>
  );
}