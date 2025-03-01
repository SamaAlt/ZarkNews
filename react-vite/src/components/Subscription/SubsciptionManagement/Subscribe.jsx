import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Subscribe = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    frequency: '',
    sections: [],
    tags: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [subscriptionId, setSubscriptionId] = useState(null); // Store the subscription ID after successful subscription

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Clear errors when user types
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');
  
    // Client-side validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.frequency) {
      setErrors({ general: 'All fields are required except sections and tags.' });
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('/api/subscriptions', formData);
      if (response.status === 201) {
        setMessage('Subscription created successfully!');
        setSubscriptionId(response.data.id); // Ensure this matches the backend response
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          frequency: '',
          sections: [],
          tags: [],
        });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Subscribe</h1>
      {message && (
        <div>
          <p style={{ color: 'green' }}>{message}</p>
          {subscriptionId && (
            <Link to={`/subscriptions/manage/${subscriptionId}`} style={{ color: 'blue', textDecoration: 'underline' }}>
              Manage Your Subscription
            </Link>
          )}
        </div>
      )}
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label>Frequency:</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          >
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          {errors.frequency && <span style={{ color: 'red' }}>{errors.frequency}</span>}
        </div>
        <div>
          <label>Sections:</label>
          <select
            name="sections"
            multiple
            value={formData.sections}
            onChange={handleMultiSelectChange}
          >
            <option value="National">National</option>
            <option value="World">World</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Technology">Technology</option>
          </select>
          {errors.sections && <span style={{ color: 'red' }}>{errors.sections}</span>}
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(',')}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',') })}
          />
          {errors.tags && <span style={{ color: 'red' }}>{errors.tags}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;