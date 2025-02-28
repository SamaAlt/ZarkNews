import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ManageProfileButton() {
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  const handleManageProfile = () => {
    navigate('/users'); // Navigate to the profile management page
  };

  return (
    <button onClick={handleManageProfile}>
      Manage Profile
    </button>
  );
}

export default ManageProfileButton;
