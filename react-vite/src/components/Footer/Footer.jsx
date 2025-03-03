import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/news/national">National</Link></li>
            <li><Link to="/news/world">World</Link></li>
            <li><Link to="/news/business">Business</Link></li>
            <li><Link to="/news/sports">Sports</Link></li>
            <li><Link to="/news/entertainment">Entertainment</Link></li>
            <li><Link to="/news/technology">Technology</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Subscribe</h4>
          <ul>
            <li><Link to="/subscriptions/subscribe">Subscribe</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Zark News. All rights reserved.</p>
      </div>
    </footer>
  );
}