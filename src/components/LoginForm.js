import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./Form.css";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } catch {
      console.log("Failed to Login");
    }
  };

  return (
    <div id="loginForm">
      <h3>Login Form</h3>
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
        Don't have an account? <Link to="/Signup">Register</Link>
      </Typography>
    </div>
  );
};

export default LoginForm;
