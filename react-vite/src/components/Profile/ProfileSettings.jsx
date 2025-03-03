import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateUser, thunkDeleteUser } from '../../redux/session';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    const updatedUser = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
    };

    if (formData.password) {
      updatedUser.password = formData.password;
    }

    const response = await dispatch(thunkUpdateUser(user.id, updatedUser));
    if (response?.errors) {
      setErrors(response.errors);
    } else {
      setSuccessMessage('Profile updated successfully!');
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const response = await dispatch(thunkDeleteUser(user.id));
      if (response?.errors) {
        setErrors(response.errors);
      } else {
        window.location.href = '/'; // Example: Redirect to home page
      }
    }
  };

  return (
    <div className="profile-settings-container">
      <h1>Profile Settings</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="form-input"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.server && <p className="error-message">{errors.server}</p>}

      <button onClick={handleDeleteAccount} className="del-button">
        Delete Account
      </button>
    </div>
  );
};

export default ProfileSettings;