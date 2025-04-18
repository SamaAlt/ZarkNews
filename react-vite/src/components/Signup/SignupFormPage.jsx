import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { validateEmail, validatePassword, validateName } from "./validators";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './SignupFormPage.css';
function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (sessionUser) return <Navigate to="" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(firstName)) newErrors.firstName = "First name is required.";
    if (!validateName(lastName)) newErrors.lastName = "Last name is required.";
    if (!validateEmail(email)) newErrors.email = "Invalid email address.";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter and one number.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must match the Password field.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const serverResponse = await dispatch(
        thunkSignup({
          firstName,
          lastName,
          email,
          password,
          role: 'editor', // Default role for new signups
        })
      );

      if (serverResponse?.errors) {
        setErrors(serverResponse.errors);
        Object.values(serverResponse.errors).forEach((error) => toast.error(error));
      } else {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h1>Sign Up</h1>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            aria-describedby="firstName-error"
          />
          {errors.firstName && <p id="firstName-error" className="error-message">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            aria-describedby="lastName-error"
          />
          {errors.lastName && <p id="lastName-error" className="error-message">{errors.lastName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="email-error"
          />
          {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby="password-error"
          />
          {errors.password && <p id="password-error" className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-describedby="confirmPassword-error"
          />
          {errors.confirmPassword && <p id="confirmPassword-error" className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>.
      </p>
    </div>
  );
}

export default SignupFormPage;