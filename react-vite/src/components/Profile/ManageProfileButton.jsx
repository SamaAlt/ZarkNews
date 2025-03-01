import { useNavigate } from 'react-router-dom';

function ManageProfileButton() {
  const navigate = useNavigate();

  const handleManageProfile = () => {
    navigate('/users'); // Navigate to the profile settings page
  };

  return (
    <button onClick={handleManageProfile}>
      Manage Profile
    </button>
  );
}

export default ManageProfileButton;
