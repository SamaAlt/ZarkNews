import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleReader.css'; // Import the CSS file

const ArticleReader = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    <div className="article-card">
      <div className="article-content">
        <h1>{article.title}</h1>
        <p className="metadata">
          <span>Author: {article.author ? `${article.author.first_name} ${article.author.last_name}` : 'Unknown'}</span>
          <span>Published: {new Date(article.created_at).toLocaleDateString()}</span>
        </p>
        <div className="content">
          {article.content}
        </div>
        {article.tags && (
          <div className="tags">
            <strong>Tags:</strong> {article.tags.join(', ')}
          </div>
        )}
      </div>
      {article.image_filename && (
        <img
          src={`/media/uploads/${article.image_filename}`}
          alt={article.title}
          className="article-image"
        />
      )}
    </div>
  );
};

export default ArticleReader;