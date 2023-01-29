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
  useEffect(() => {
    async function getQuiz() {
      let list = await getAllQuiz();
      setQuizList(list);
    }
    getQuiz();
  }, [openModal]);

  // const quizList = [
  //   {
  //     title: "1st quiz",
  //     permalinks: "AQSWDE",
  //     questions: [
  //       {
  //         question: "How are you?",
  //         questionType: "MCQ",
  //         answerOption: ["Good", "Bad", "Okay"],
  //         correctAnswer: ["Good"],
  //       },
  //       {
  //         question: "Where do you visited?",
  //         questionType: "Multiple",
  //         answerOption: ["Mumbai", "Pune", "Goa"],
  //         correctAnswer: ["Mumbai", "Pune"],
  //       },
  //     ],
  //   },
  //   {
  //     title: "2nd quiz",
  //     permalinks: "EDRFTG",
  //     questions: [
  //       {
  //         question: "How are you?",
  //         questionType: "Multiple",
  //         answerOption: ["Good", "Bad", "Okay", "Sad"],
  //         correctAnswer: ["Good", "Okay"],
  //       },
  //       {
  //         question: "Where do you visited?",
  //         questionType: "Multiple",
  //         answerOption: ["Mumbai", "Pune", "Goa"],
  //         correctAnswer: ["Mumbai", "Pune"],
  //       },
  //     ],
  //   },
  // ];
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
        <div className="allQuiz">
          {quizList.map((el, index) => {
            return <Quiz item={el} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
