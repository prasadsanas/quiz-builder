import { Button } from "@mui/material";
import React, { useState } from "react";
import CreateQuiz from "./CreateQuiz";
import "./HomePage.css";
const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div id="home">
      <div className="homeLeft"></div>
      <div className="homeRight">
        <div className="createQuizBtn">
          <Button onClick={handleOpenModal}>Create Quiz</Button>
        </div>
        {<CreateQuiz openModal={openModal} onClose={handleCloseModal} />}
        <div className="allQuiz"></div>
      </div>
    </div>
  );
};

export default HomePage;
