import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import SignInForm from "./components/signinForm";
import { useSelector } from 'react-redux';
import "./App.css";
import SignUpForm from "./components/signUpForm";
import FilmsPage from "./components/film";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} /> 
          {isAuthenticated && <Route path="/films" element={<FilmsPage />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
