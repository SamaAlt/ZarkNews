import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileButton from '../ProfileButton';
import Sidebar from '../Sidebar/Sidebar';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/articles/my-articles?page=${pageNumber}&limit=50`);
      const newArticles = response.data.articles;
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setHasMore(newArticles.length === 50);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const handleReadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <nav>
        <ProfileButton />
      </nav>
      <Sidebar />
      <h1>My Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button onClick={handleReadMore}>Read More</button>
      )}
    </div>
  );
};

export default MyArticles;