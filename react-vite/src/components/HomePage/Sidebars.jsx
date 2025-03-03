import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebars.css'; // Make sure to create and import a CSS file for styling

const Sidebars = () => {
  const [sidebarArticles, setSidebarArticles] = useState([]);

  useEffect(() => {
    const fetchSidebarArticles = async () => {
      try {
        const response = await axios.get('/api/articles', {
          params: {
            display_type: ['sidebar_1', 'sidebar_2', 'sidebar_3'],
            per_page: 3,
          },
        });

        const fetchedArticles = response.data.articles;

        if (fetchedArticles.length < 3) {
          const latestResponse = await axios.get('/api/articles', {
            params: {
              per_page: 3 - fetchedArticles.length,
              exclude_ids: fetchedArticles.map(article => article.id),
            },
          });

          setSidebarArticles([...fetchedArticles, ...latestResponse.data.articles]);
        } else {
          setSidebarArticles(fetchedArticles);
        }
      } catch (error) {
        console.error('Error fetching sidebar articles:', error);
      }
    };

    fetchSidebarArticles();
  }, []);

  return (
    <div className="sidebars">
      <ul>
        {sidebarArticles.map((article, index) => (
          <li key={article.id} className="sidebar-card">
            <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={`Sidebar ${index + 1}`}
                  className="sidebar-image"
                />
              )}
              <div className="sidebar-content">
                <h3>{`${article.title}`}</h3>
                <p>{article.content.substring(0, 80)}...</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebars;