import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArticleModal = ({ articleId, onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [displayType, setDisplayType] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [section, setSection] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch the article data when the modal is opened
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${articleId}`);
        const article = response.data;
        setTitle(article.title);
        setDisplayType(article.display_type);
        setContent(article.content);
        setLocation(article.location);
        setSection(article.section);
        setTags(article.tags.join(', ')); // Assuming tags are stored as an array
      } catch (err) {
        setError('Failed to fetch article data.');
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleUpdateArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('display_type', displayType);
    formData.append('content', content);
    formData.append('location', location);
    formData.append('section', section);
    formData.append('tags', tags);
    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await axios.put(`/api/articles/${articleId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Article updated successfully!');
      setError('');
      onUpdate(response.data); // Notify parent component of the update
    } catch (err) {
      setError('Failed to update article. Please try again.');
      setMessage('');
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Update Article</h2>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
        <form onSubmit={handleUpdateArticle}>
          <div style={styles.formGroup}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Display Type:</label>
            <input
              type="text"
              value={displayType}
              onChange={(e) => setDisplayType(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Section:</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Upload New Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" style={styles.submitButton}>Update Article</button>
        </form>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

// Inline styles for the modal
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    maxWidth: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  formGroup: {
    marginBottom: '15px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UpdateArticleModal;