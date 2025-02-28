import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import LoginForm from "../../components/LoginForm.js";
import Signup from "../../components/Signup";

const InitialPage = () => {
  const { getAllQuizAnonymous } = useAuth();
  const [quizList, setQuizList] = useState([]);
  const [showLoginComponent, setShowLoginComponent] = useState(true);
  useEffect(() => {
    async function getQuiz() {
      let list = await getAllQuizAnonymous();
      setQuizList(list);
    }
    getQuiz();
  }, []);

  const navigate = useNavigate();
  const handleAnonymousQuiz = (item) => {
    navigate(`/Quiz/${item.permalinks}`);
  };
  return (
    <div className="loginHome">
      <div className="quiz">
        <h2>Take Quiz Without Login</h2>
        <div className="allQuiz">
          {quizList.map((el, index) => {
            return (
              <div key={index} className="allQuizDiv">
                <div>{el.title}</div>
                <div
                  onClick={() => handleAnonymousQuiz(el)}
                  className="attemptQuizText"
                >
                  Attempt Quiz
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="loginMain">
        {showLoginComponent ? (
          <LoginForm setShowLoginComponent={setShowLoginComponent} />
        ) : (
          <Signup setShowLoginComponent={setShowLoginComponent} />
        )}
      </div>
    </div>
  );
};

export default InitialPage;
