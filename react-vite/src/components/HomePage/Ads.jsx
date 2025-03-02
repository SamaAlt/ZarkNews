import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <h2>Ads</h2>
      <ul>
        {adsArticles.map((article, index) => (
          <li key={article.id}>
            <h3>{`Ad ${index + 1}: ${article.title}`}</h3>
            <p>{article.content.substring(0, 100)}...</p>
            <Link to={`/articles/${article.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ads;