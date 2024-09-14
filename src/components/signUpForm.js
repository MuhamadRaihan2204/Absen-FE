import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { register, resetError, resetSuccessMessage } from "../redux/register";
import "./signUpForm.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.register.error);
  const successMessage = useSelector((state) => state.register.successMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error,
      }).then(() => {
        dispatch(resetError());
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: successMessage,
      }).then(() => {
        dispatch(resetSuccessMessage());
      });
    }
  }, [successMessage, dispatch]);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
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
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="register-button">
          Sign Up
        </button>
        <div className="form-links">
          <a href="/">Already have an account? Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
