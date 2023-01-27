import React, { useState } from "react";
import "./Quiz.css";
import ViewQuiz from "./ViewQuiz";

const Quiz = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="quizMain" onClick={handleOpenModal}>
      <div>{props.item.title}</div>
      {openModal && (
        <ViewQuiz
          item={props.item}
          openModal={openModal}
          onClose={handleCloseModal}
        />
      )}
      <div className="quizLink">
        <div>Copy Link</div>
        <div>Delete</div>
      </div>
    </div>
  );
};

export default Quiz;
