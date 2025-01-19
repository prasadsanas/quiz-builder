import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./Form.css";

const Signup = ({ setShowLoginComponent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/Dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div id="signupForm">
      <h1>Register Form</h1>
      {error && <p className="errorText">{error}</p>}
      <TextField
        className="inputField"
        label="Email Id"
        variant="outlined"
        onChange={(e) => handleEmailChange(e)}
      ></TextField>
      <TextField
        className="inputField"
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => handlePasswordChange(e)}
      ></TextField>
      <Button className="submitBtn" variant="outlined" onClick={handleSignup}>
        Signup
      </Button>
      <Typography>
        Already have an account?{" "}
        <span onClick={() => setShowLoginComponent(true)}>Login</span>
      </Typography>
    </div>
  );
};

export default Signup;
