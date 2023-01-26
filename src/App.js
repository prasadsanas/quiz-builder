import { Button } from "@mui/material";
import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  const handleSingupClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  return (
    <div className="main">
      <div className="mainBtn">
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={handleSingupClick}>Signup</Button>
      </div>
      <div className="mainComponent">
        {showLogin && <LoginForm />}
        {showRegister && <Signup />}
      </div>
    </div>
  );
};

export default App;
