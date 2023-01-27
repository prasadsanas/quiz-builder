import { Alert, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./Form.css";

const Signup = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/Dashboard");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <div id="signupForm">
      <h3>Register Form</h3>
      <TextField
        className="inputField"
        label="Email Id"
        variant="outlined"
        onChange={handleEmailChange}
      ></TextField>
      <TextField
        className="inputField"
        label="Password"
        type="password"
        variant="outlined"
        onChange={handlePasswordChange}
      ></TextField>
      <Button className="submitBtn" variant="outlined" onClick={handleSignup}>
        Signup
      </Button>
      <Typography>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </div>
  );
};

export default Signup;
