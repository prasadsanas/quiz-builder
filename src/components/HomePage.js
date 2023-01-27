import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import CreateQuiz from "./CreateQuiz";
import "./HomePage.css";
const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      console.log("Failed to Logout");
    }
  };
  return (
    <div id="home">
      <div className="homeLeft">
        <div className="logoutBtnDiv">
          <Button onClick={handleLogout} className="logoutBtn">
            Log out
          </Button>
        </div>
      </div>
      <div className="homeRight">
        <div className="createQuizBtnDiv">
          <Button className="createQuizBtn" onClick={handleOpenModal}>
            Create Quiz
          </Button>
        </div>
        {openModal && (
          <CreateQuiz openModal={openModal} onClose={handleCloseModal} />
        )}
        <div className="allQuiz"></div>
      </div>
    </div>
  );
};

export default HomePage;
