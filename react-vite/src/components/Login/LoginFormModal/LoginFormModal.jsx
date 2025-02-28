import { useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkLogin } from "../../../redux/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user); // sessionUser is declared but not used
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({ email, password })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      // Use the sessionUser from the top level instead of calling useSelector again
      if (sessionUser && (sessionUser.role === 'editor' || sessionUser.role === 'admin')) {
        closeModal();
      } else {
        setErrors({ server: "Only editors and admins can log in." });
      }
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;