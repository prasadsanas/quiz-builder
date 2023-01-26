import { Button, TextField } from "@mui/material";
import React from "react";
import "./Form.css";

const LoginForm = () => {
  return (
    <div id="loginForm">
      <h3>Login Form</h3>
      <TextField
        className="inputField"
        label="Email Id"
        variant="outlined"
      ></TextField>
      <TextField
        className="inputField"
        label="Password"
        variant="outlined"
      ></TextField>
      <Button className="submitBtn" variant="outlined">
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
