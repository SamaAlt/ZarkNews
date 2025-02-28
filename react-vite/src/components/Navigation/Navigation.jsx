// react-vite/src/components/Navigation/Navigation.jsx
import { Link } from 'react-router-dom';

export default function Navigation({ user }) {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {/* Category Links */}
        <Link to="/category/national">National</Link>
        <Link to="/category/world">World</Link>
        <Link to="/category/business">Business</Link>
        <Link to="/category/sports">Sports</Link>
        <Link to="/category/entertainment">Entertainment</Link>
        <Link to="/category/technology">Technology</Link>
      </div>
      <div>
        {/* Subscription Link */}
        <Link to="/subscribe">Subscribe</Link>
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