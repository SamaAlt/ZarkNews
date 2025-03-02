import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListArticles = () => {
  const [listArticles, setListArticles] = useState([]);

   useEffect(() => {
    const fetchListArticles = async () => {
      try {
         const listResponse = await axios.get('/api/articles', {
          params: {
            display_type: 'list',
            per_page: 15, // Fetch up to 15 articles
          },
        });

        const fetchedListArticles = listResponse.data.articles;

         if (fetchedListArticles.length < 15) {
          const latestResponse = await axios.get('/api/articles', {
            params: {
              per_page: 15 - fetchedListArticles.length, // Fetch the remaining articles
              exclude_ids: fetchedListArticles.map(article => article.id), // Exclude already fetched articles
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
    <div className="list-articles">
      <h2>List Articles</h2>
      <ul>
        {listArticles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content.substring(0, 100)}...</p>
            <Link to={`/articles/${article.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListArticles;