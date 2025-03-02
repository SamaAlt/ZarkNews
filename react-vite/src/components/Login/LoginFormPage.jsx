import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

   if (sessionUser) return <Navigate to="/dashboard" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
     const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsLoading(true);
    setErrors({});
  
    const serverResponse = await dispatch(thunkLogin({ email, password }));
  
    setIsLoading(false);
  
    if (serverResponse?.errors) {
       setErrors({
        ...serverResponse.errors,
        ...(serverResponse.errors.server && { server: serverResponse.errors.server }),
      });
    } else {
      navigate("/dashboard");  
    }
  };
  
  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit} noValidate>
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
          {errors.email && (
            <p id="email-error" className="error-message">
              {errors.email}
            </p>
          )}
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
          {errors.password && (
            <p id="password-error" className="error-message">
              {errors.password}
            </p>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p>
        Don’t have an account yet? <Link to="/signup">Sign up here</Link> to get started!
      </p>
    </div>
  );
}

export default LoginFormPage;