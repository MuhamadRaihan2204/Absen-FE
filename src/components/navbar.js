import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate('/');
    } else {
      if (location.pathname === '/') {
        navigate('/register');
      } else if (location.pathname === '/register') {
        navigate('/');
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul className="navbar-links">
          <li>channelName</li>
          <li>Home</li>
          <li>
            Browse
            <span className="dropdown-arrow">&#9662;</span>
          </li>
          <li>
            My Library
            <span className="dropdown-arrow">&#9662;</span>
          </li>
        </ul>
      </div>
      <button className="sign-up-button" onClick={handleAuthClick}>
        {isAuthenticated ? 'Sign Out' : location.pathname === '/' ? 'Sign Up' : 'Sign In'}
      </button>
    </nav>
  );
};

export default Navbar;
