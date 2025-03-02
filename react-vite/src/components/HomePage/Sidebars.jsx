import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebars = () => {
  const [sidebarArticles, setSidebarArticles] = useState([]);

   useEffect(() => {
    const fetchSidebarArticles = async () => {
      try {
         const response = await axios.get('/api/articles', {
          params: {
            display_type: ['sidebar_1', 'sidebar_2', 'sidebar_3'],
            per_page: 3, // Fetch up to 3 articles
          },
        });

        const fetchedArticles = response.data.articles;

         if (fetchedArticles.length < 3) {
          const latestResponse = await axios.get('/api/articles', {
            params: {
              per_page: 3 - fetchedArticles.length, // Fetch the remaining articles
              exclude_ids: fetchedArticles.map(article => article.id), // Exclude already fetched articles
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
      <h2>Sidebars</h2>
      <ul>
        {sidebarArticles.map((article, index) => (
          <li key={article.id}>
            <h3>{`Sidebar ${index + 1}: ${article.title}`}</h3>
            <p>{article.content.substring(0, 100)}...</p>
            <Link to={`/articles/${article.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebars;