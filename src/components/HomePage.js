import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import CreateQuiz from "./CreateQuiz";
import "./HomePage.css";
import Quiz from "./Quiz";
const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { logout, getAllQuiz } = useAuth();
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

  const [quizList, setQuizList] = useState([]);
  const [refreshList, setRefreshList] = useState(0);
  function refreshListFn() {
    if (refreshList == 1) {
      setRefreshList(0);
    } else {
      setRefreshList(1);
    }
  }
  useEffect(() => {
    async function getQuiz() {
      let list = await getAllQuiz();
      setQuizList(list);
    }
    getQuiz();
  }, [openModal, refreshList]);

  return (
    <div id="home">
      <div className="logoutBtnDiv">
        <Button onClick={handleLogout} className="logoutBtn">
          Log out
        </Button>
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
        <div className="allQuiz">
          {quizList.map((el, index) => {
            return <Quiz item={el} key={index} refreshList={refreshListFn} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
