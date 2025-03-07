import Headline from './Headline'; // Ensure the path is correct
import ListArticles from './ListArticles';
import Ads from './Ads'; // Ensure the path is correct
import Sidebars from './Sidebars';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <div className="headline">
        <Headline />
      </div>
      <div className="sidebars">
        <Sidebars />
      </div>
      <div className="listarticles">
        <ListArticles />
      </div>
      <div className="ads">
        <Ads />
      </div>
    </div>
  );
};

export default HomePage;