import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListArticles.css';

const ListArticles = () => {
  const [listArticles, setListArticles] = useState([]);

  useEffect(() => {
    const fetchListArticles = async () => {
      try {
        const listResponse = await axios.get('/api/articles', {
          params: {
            display_type: 'list',
            per_page: 15,
          },
        });

        const fetchedListArticles = listResponse.data.articles;

        if (fetchedListArticles.length < 15) {
          const latestResponse = await axios.get('/api/articles', {
            params: {
              per_page: 15 - fetchedListArticles.length,
              exclude_ids: fetchedListArticles.map(article => article.id),
            },
          });

          setListArticles([...fetchedListArticles, ...latestResponse.data.articles]);
        } else {
          setListArticles(fetchedListArticles);
        }
      } catch (error) {
        console.error('Error fetching list articles:', error);
      }
    };

    fetchListArticles();
  }, []);

  return (
    <div className="list-card">
      {listArticles.map((article) => (
        <Link to={`/articles/${article.id}`} key={article.id} className="sidebar-card">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="list-image"
            />
          )}
          <div className="list-content">
            <h3>{article.title}</h3>
            <p>{article.content.substring(0, 100)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListArticles;