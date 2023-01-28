import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Quiz.css";
import ViewQuiz from "./ViewQuiz";

const Quiz = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAttemptQuiz = (item) => {
    navigate(`/Quiz/${item.permalinks}`);
  };
  const handleCopyLink = (item) => {
    let url = `http://localhost:3000/Quiz/${item.permalinks}`;
    navigator.clipboard.writeText(url);
  };
  const handleDelete = (item) => {
    console.log("Deleted", item);
  };
  return (
    <div className="quizMain">
      <div className="quizTitle" onClick={handleOpenModal}>
        {props.item.title}
      </div>
      {openModal && (
        <ViewQuiz
          item={props.item}
          openModal={openModal}
          onClose={handleCloseModal}
        />
      )}
      <div className="quizLink">
        <div onClick={() => handleAttemptQuiz(props.item)}>Attempt Quiz</div>
        <div onClick={() => handleCopyLink(props.item)}>Copy Link</div>
        <div onClick={() => handleDelete(props.item)}>Delete</div>
      </div>
    </div>
  );
};

export default Quiz;
