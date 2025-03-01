import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ManageSubscription = () => {
  const { subscription_id } = useParams(); // Extract subscription_id from the URL
  const navigate = useNavigate();
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

  useEffect(() => {
    console.log('Subscription ID from URL:', subscription_id); // Debugging log

    // Check if subscription_id is missing or invalid
    if (!subscription_id || isNaN(subscription_id)) {
      setMessage('Invalid subscription ID. Redirecting...');
      navigate('/subscribe'); // Redirect to the subscribe page
      return;
    }

    const fetchSubscription = async () => {
      setLoading(true);
      setMessage(''); // Clear any previous messages
      try {
        const response = await axios.get(`/api/subscriptions/${subscription_id}`);
        console.log('Subscription data:', response.data); // Debugging log
        if (response.status === 200) {
          setFormData({
            ...response.data,
            sections: response.data.sections || [],
            tags: response.data.tags || [],
          });
        }
      } catch (error) {
        console.error('Error fetching subscription:', error); // Debugging log
        if (error.response) {
          // Handle specific HTTP errors
          if (error.response.status === 404) {
            setMessage('Subscription not found. Please check the subscription ID.');
          } else if (error.response.status === 500) {
            setMessage('Server error. Please try again later.');
          } else {
            setMessage('Failed to fetch subscription details.');
          }
        } else if (error.request) {
          // Handle network errors
          setMessage('Network error. Please check your connection.');
        } else {
          // Handle other errors
          setMessage('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [subscription_id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
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

  const handleTagsChange = (e) => {
    const { value } = e.target;
    const tagsArray = value.split(',').map((tag) => tag.trim());
    setFormData({
      ...formData,
      tags: tagsArray,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    console.log('Form Data:', formData); // Debugging log

    // Validate required fields
    if (!formData.frequency) {
      console.log('Validation failed: Frequency is required'); // Debugging log
      setErrors({
        ...errors,
        frequency: !formData.frequency ? 'Frequency is required' : '',
      });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        frequency: formData.frequency,
        sections: formData.sections,
        tags: formData.tags,
      };

      console.log('Payload being sent:', payload); // Debugging log

      const response = await axios.put(`/api/subscriptions/${subscription_id}`, payload);
      console.log('Response from server:', response); // Debugging log

      if (response.status === 200) {
        setMessage('Subscription updated successfully!');
      }
    } catch (error) {
      console.error('Error during update:', error); // Debugging log
      if (error.response && error.response.data.errors) {
        console.log('Backend validation errors:', error.response.data.errors); // Debugging log
        setErrors(error.response.data.errors);
      } else {
        setMessage('Failed to update subscription.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      setLoading(true);
      try {
        const response = await axios.delete(`/api/subscriptions/${subscription_id}`);
        if (response.status === 200) {
          setMessage('Subscription deleted successfully!');
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            frequency: '',
            sections: [],
            tags: [],
          });
          navigate('/subscribe'); // Redirect to the subscribe page after deletion
        }
      } catch (error) {
        setMessage('Failed to delete subscription.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Manage Subscription</h1>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            disabled={loading}
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
            disabled={loading}
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
            disabled
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
            disabled={loading}
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
            disabled={loading}
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
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            disabled={loading}
          />
          {errors.tags && <span style={{ color: 'red' }}>{errors.tags}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Subscription'}
        </button>
      </form>
      <button
        onClick={handleDelete}
        style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Subscription'}
      </button>
    </div>
  );
};

export default ManageSubscription;