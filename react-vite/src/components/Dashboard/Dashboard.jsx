import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faNewspaper,
  faBook,
  faList,
  faChartLine,
  faEnvelope,
  faGlobeAmericas,
  faGlobe,
  faBriefcase,
  faFootballBall,
  // faFilm,
  faLaptop,
  faArchive, // Added for the archive link
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="grid-container">
          {/* Existing Links */}
          <Link to="/users" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span>Profile Settings</span>
          </Link>
          <Link to="/articles/panel" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <span>Article Panel</span>
          </Link>
          <Link to="/articles/my-articles" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faBook} />
            </div>
            <span>My Articles</span>
          </Link>
          <Link to="/articles/all-articles" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faList} />
            </div>
            <span>All Articles</span>
          </Link>
          <Link to="/subscriptions/analytics" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <span>Reader Analytics</span>
          </Link>

          {/* New Links */}
          <Link to="/subscriptions/subscribe" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <span>Subscribe to Newsletter</span>
          </Link>
          <Link to="/news/national" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faGlobeAmericas} />
            </div>
            <span>National News</span>
          </Link>
          <Link to="/news/world" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <span>World News</span>
          </Link>
          <Link to="/news/business" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <span>Business News</span>
          </Link>
          <Link to="/news/sports" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faFootballBall} />
            </div>
            <span>Sports News</span>
          </Link>
          {/* <Link to="/news/entertainment" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faFilm} />
            </div>
            <span>Entertainment News</span>
          </Link> */}
          <Link to="/news/technology" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <span>Technology News</span>
          </Link>

          {/* Archived Articles Link */}
          <Link to="/articles/archive" className="grid-item">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faArchive} />
            </div>
            <span>Archived Articles</span>
          </Link>
        </div>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;