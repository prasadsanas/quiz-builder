import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./Quiz.css";
import ViewQuiz from "./ViewQuiz";

const Quiz = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { deleteQuiz } = useAuth();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAttemptQuiz = (item) => {
    navigate(`/Quiz/${item.permalinks}`, { state: { item } });
  };
  const handleCopyLink = (item) => {
    let url = window.location.href;
    let domain = new URL(url);
    domain = `${domain.hostname}/Quiz/${item.permalinks}`;
    navigator.clipboard.writeText(domain);
  };
  const handleDelete = async (item) => {
    await deleteQuiz(item.permalinks);
    props.refreshList(1);
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
        <div
          className="attemptQuizText"
          onClick={() => handleAttemptQuiz(props.item)}
        >
          Attempt Quiz
        </div>
        <div
          className="copyLinkQuizText"
          onClick={() => handleCopyLink(props.item)}
        >
          Copy Link
        </div>
        <div
          className="deleteQuizText"
          onClick={() => handleDelete(props.item)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default Quiz;
