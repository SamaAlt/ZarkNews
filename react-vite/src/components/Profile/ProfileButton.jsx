import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../Login/LoginFormPage";
import SignupFormModal from "../Signup/SignupFormPage";
import ManageProfileButton from './ManageProfileButton'; // Import ManageProfileButton
import './ProfileButton.css'; // Import the CSS file for styling

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout()).then(() => {
      closeMenu();
    });
  };

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu} className="profile-button">
        <FaUserCircle className="profile-icon" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li className="dropdown-item">{user.username}</li>
              <li className="dropdown-item">{user.email}</li>
              <li className="dropdown-item">
                <ManageProfileButton />
              </li>
              <li className="dropdown-item">
                <button onClick={logout} className="logout-button">Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li className="dropdown-item">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="dropdown-item">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;