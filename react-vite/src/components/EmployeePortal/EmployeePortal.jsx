import LoginFormPage from '../../components/Login/LoginFormPage';
import './EmployeePortal.css';

const EmployeePortal = () => {
  return (
    <div className="portal">
      <LoginFormPage />
      <div className="portal-content">
        <h1>Welcome to the Employee Portal</h1>
        <p>
          At Zark News, our mission is to bring news and truth to people around the world.
          We are committed to delivering accurate, timely, and impactful stories that matter.
          Join us in our journey to make a difference!
        </p>
        <p>
          This portal is designed to help you stay connected, access resources, and contribute
          to our shared mission. Thank you for being a part of our team!
        </p>
      </div>
    </div>
  );
};

export default EmployeePortal;