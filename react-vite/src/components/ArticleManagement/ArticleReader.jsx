import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleReader = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the article by ID
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.errors || ['An error occurred while fetching the article']);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.join(', ')}</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div className="article-reader">
      <h1>{article.title}</h1>
      <p className="metadata">
        <span>Author: {article.author?.username || 'Unknown'}</span>
        <span>Published: {new Date(article.created_at).toLocaleDateString()}</span>
      </p>
      <div className="content">
        {article.content}
      </div>
      {article.image_filename && (
        <img
          src={`/media/uploads/${article.image_filename}`}
          alt={article.title}
          className="article-image"
        />
      )}
      {article.tags && (
        <div className="tags">
          <strong>Tags:</strong> {article.tags.join(', ')}
        </div>
      )}
    </div>
  );
};

export default ArticleReader;