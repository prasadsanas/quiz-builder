import { Button, TextField } from "@mui/material";
import React from "react";
import "./Form.css";

const Signup = () => {
  return (
    <div id="signupForm">
      <h3>Register Form</h3>
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
        Signup
      </Button>
    </div>
  );
};

export default Signup;
