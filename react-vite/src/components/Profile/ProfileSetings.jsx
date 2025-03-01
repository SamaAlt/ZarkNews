import ProfileButton from '../ProfileButton';
import Sidebar from '../Sidebar/Sidebar';

const ProfileSettings = () => {
  return (
    <div>
      <nav>
        <ProfileButton />
      </nav>
      <Sidebar /> 
      <h1>Profile Setings</h1>
    </div>
  );
};

export default ProfileSettings;