import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { login, resetError } from '../redux/auth';
import './signinForm.css';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error,
      }).then(() => {
        dispatch(resetError());
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
      }).then(() => {
        navigate('/films');
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
        <div className="form-links">
          <a href="/">Forgot Password?</a>
        </div>
        <div className="form-links">
            Don`t have an account ?`
          <a href="/register">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;