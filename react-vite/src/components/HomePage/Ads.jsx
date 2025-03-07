import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Ads.css'; // Import the CSS file

const Ads = () => {
  const [adsArticles, setAdsArticles] = useState([]);

  useEffect(() => {
    const fetchAdsArticles = async () => {
      try {
        const response = await axios.get('/api/articles', {
          params: {
            display_type: ['ads_1', 'ads_2'],
            per_page: 2,
          },
        });

        const fetchedArticles = response.data.articles;

        if (fetchedArticles.length < 2) {
          const latestResponse = await axios.get('/api/articles', {
            params: {
              per_page: 2 - fetchedArticles.length,
              exclude_ids: fetchedArticles.map(article => article.id),
            },
          });

          setAdsArticles([...fetchedArticles, ...latestResponse.data.articles]);
        } else {
          setAdsArticles(fetchedArticles);
        }
      } catch (error) {
        console.error('Error fetching ads articles:', error);
      }
    };

    fetchAdsArticles();
  }, []);

  return (
    <div className="ads">
      <ul className="ads-list">
        {adsArticles.map((article, index) => (
          <li key={article.id} className="ads-item">
            <Link to={`/articles/${article.id}`} className="ad-link">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={`Ad ${index + 1}`}
                  className="ad-image"
                />
              )}
              <h3 className="ad-title">{`${article.title}`}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ads;