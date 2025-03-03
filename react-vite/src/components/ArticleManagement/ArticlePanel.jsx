import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ArticlePanel = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [displayType, setDisplayType] = useState('');
  const [location, setLocation] = useState('');
  const [section, setSection] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const VALID_DISPLAY_TYPES = ['headline', 'sidebar_1', 'sidebar_2', 'sidebar_3', 'list', 'ads_1', 'ads_2', 'archived'];
  const VALID_SECTIONS = ['national', 'world', 'business', 'sports', 'entertainment', 'technology'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/articles/${id}`);
          if (!response.ok) throw new Error('Failed to fetch article');
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setDisplayType(data.display_type);
          setLocation(data.location);
          setSection(data.section);
          setTags(data.tags.join(', '));
        }

        const articlesResponse = await fetch('/api/articles/my-articles');
        if (!articlesResponse.ok) throw new Error('Failed to fetch articles');
        const articlesData = await articlesResponse.json();
        setArticles(articlesData.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      display_type: displayType,
      location,
      section,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    if (!VALID_DISPLAY_TYPES.includes(articleData.display_type)) {
      setError('Invalid display type');
      return;
    }
    if (!VALID_SECTIONS.includes(articleData.section)) {
      setError('Invalid section');
      return;
    }

    const url = id ? `/api/articles/${id}` : '/api/articles';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(articleData),
      });

      if (!response.ok) throw new Error('Failed to save article');

      const data = await response.json();

      const articlesResponse = await fetch('/api/articles/my-articles');
      if (!articlesResponse.ok) throw new Error('Failed to fetch articles');
      const articlesData = await articlesResponse.json();

      setArticles(articlesData.articles);
      navigate('/articles/my-articles');
    } catch (error) {
      console.error('Error saving article:', error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/articles/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to delete article');

        setArticles(articles.filter(article => article.id !== parseInt(id)));
        navigate('/articles/my-articles');
      } catch (error) {
        console.error('Error deleting article:', error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="article-panel">
      <h1>{id ? 'Edit Article' : 'Create Article'}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Display Type:</label>
          <select value={displayType} onChange={(e) => setDisplayType(e.target.value)} required>
            <option value="">Select a display type</option>
            {VALID_DISPLAY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Event Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Section:</label>
          <select value={section} onChange={(e) => setSection(e.target.value)} required>
            <option value="">Select a section</option>
            {VALID_SECTIONS.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tags (comma separated):</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">{id ? 'Update Article' : 'Create Article'}</button>
        {id && <button type="button" onClick={handleDelete} className="delete-button">Delete Article</button>}
      </form>
      <h2>My Articles</h2>
      {loading && <p>Loading...</p>}
      {!loading && articles.length === 0 && <p>No articles found.</p>}
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            <h3>{article.title}</h3>
            <p>{article.content.substring(0, 100)}...</p>
            <Link to={`/articles/edit/${article.id}`} className="edit-link">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlePanel;