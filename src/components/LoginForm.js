import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./Form.css";

const LoginForm = ({ setShowLoginComponent }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/Dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="loginForm">
      <h1>Login to Create Quiz</h1>
      {error && <p className="errorText">{error}</p>}
      <TextField
        className="inputField"
        label="Email Id"
        variant="outlined"
        onChange={handleEmailChange}
      ></TextField>
      <TextField
        className="inputField"
        label="Password"
        variant="outlined"
        type="password"
        onChange={handlePasswordChange}
      ></TextField>
      <Button
        className="submitBtn"
        variant="outlined"
        onClick={handleLoginSubmit}
      >
        Login
      </Button>
      <Typography>
        Don't have an account?{" "}
        <span onClick={() => setShowLoginComponent(false)}>Register</span>
      </Typography>
    </div>
  );
};

export default LoginForm;
