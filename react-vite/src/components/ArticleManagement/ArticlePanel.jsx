import { useState } from 'react';
import axios from 'axios';
import ProfileButton from '../../components/ProfileButton';
import Sidebar from '../Sidebar/Sidebar';
import UpdateArticleModal from './UpdateArticleModal '; // Import the modal component

const ArticlePanel = () => {
  const [title, setTitle] = useState('');
  const [displayType, setDisplayType] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [section, setSection] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // State for managing the update modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Handle creating a new article
  const handleCreateArticle = async (e) => {
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
      const response = await axios.post('/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Article created successfully!');
      setError('');
      // Clear form fields
      setTitle('');
      setDisplayType('');
      setContent('');
      setLocation('');
      setSection('');
      setTags('');
      setImage(null);
    } catch (err) {
      setError('Failed to create article. Please try again.');
      setMessage('');
    }
  };

  // Handle deleting an article
  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      setMessage('Article deleted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to delete article. Please try again.');
      setMessage('');
    }
  };

  // Handle opening the update modal
  const handleOpenModal = (articleId) => {
    setSelectedArticleId(articleId);
    setIsModalOpen(true);
  };

  // Handle closing the update modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticleId(null);
  };

  // Handle successful article update
  const handleArticleUpdate = (updatedArticle) => {
    setMessage('Article updated successfully!');
    setError('');
    // You can also refetch articles or update the UI here
  };

  return (
    <div>
      <nav>
        <ProfileButton />
      </nav>
      <Sidebar />
      <h1>Article Panel</h1>

      {/* Create New Article Form */}
      <div>
        <h2>Create New Article</h2>
        <form onSubmit={handleCreateArticle}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Display Type:</label>
            <input
              type="text"
              value={displayType}
              onChange={(e) => setDisplayType(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Section:</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit">Create Article</button>
        </form>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Delete Article Form */}
      <div>
        <h2>Delete Article</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const id = e.target.articleId.value;
          handleDeleteArticle(id);
        }}>
          <div>
            <label>Article ID:</label>
            <input
              type="text"
              name="articleId"
              required
            />
          </div>
          <button type="submit">Delete Article</button>
        </form>
      </div>

      {/* Update Article Button */}
      <div>
        <h2>Update Article</h2>
        <button onClick={() => handleOpenModal(1)}>Edit Article 1</button>
      </div>

      {/* Update Article Modal */}
      {isModalOpen && (
        <UpdateArticleModal
          articleId={selectedArticleId}
          onClose={handleCloseModal}
          onUpdate={handleArticleUpdate}
        />
      )}
    </div>
  );
};

export default ArticlePanel;