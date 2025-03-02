import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import Sidebar from '../Sidebar/Sidebar';
import { thunkUpdateUser, thunkDeleteUser } from '../../redux/session';

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
  
    // Check if passwords match
    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
  
    // Prepare the updated user data
    const updatedUser = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
    };
  
    // Only include the password if it's provided
    if (formData.password) {
      updatedUser.password = formData.password;
    }
  
    // Debugging: Log the payload being sent to the backend
    console.log("Payload being sent to backend:", updatedUser);
  
    // Dispatch the update thunk
    const response = await dispatch(thunkUpdateUser(user.id, updatedUser));
    if (response?.errors) {
      setErrors(response.errors);
    } else {
      setSuccessMessage('Profile updated successfully!');
      // Clear password fields after successful update
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
        // Redirect or perform any other action after successful deletion
        window.location.href = '/'; // Example: Redirect to home page
      }
    }
  };

  return (
    <div>
      <nav>
        <ProfileButton />
      </nav>
      <Sidebar />
      <h1>Profile Settings</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}

      <button onClick={handleDeleteAccount} style={{ marginTop: '20px', color: 'red' }}>
        Delete Account
      </button>
    </div>
  );
};

export default ProfileSettings;