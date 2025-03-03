import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListArticles.css';

const ListArticles = () => {
  const [listArticles, setListArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchListArticles = async (page) => {
    try {
      const listResponse = await axios.get('/api/articles', {
        params: {
          display_type: 'list',
          per_page: 15,
          page: page,
        },
      });

      const fetchedListArticles = listResponse.data.articles;

      if (fetchedListArticles.length < 15) {
        setHasMore(false);
      }

      if (page === 1) {
        setListArticles(fetchedListArticles);
      } else {
        setListArticles((prevArticles) => [...prevArticles, ...fetchedListArticles]);
      }
    } catch (error) {
      console.error('Error fetching list articles:', error);
    }
  };

  useEffect(() => {
    fetchListArticles(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
            <p>{article.content.substring(0, 200)}...</p>
          </div>
        </Link>
      ))}
      {hasMore && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default ListArticles;