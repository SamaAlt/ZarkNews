// react-vite/src/components/LoginFormModal.jsx
import { useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      const user = useSelector((state) => state.session.user);
      if (user && (user.role === 'editor' || user.role === 'admin')) {
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