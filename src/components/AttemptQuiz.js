import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./AttemptQuiz.css";
import { useAuth } from "./contexts/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const AttemptQuiz = (props) => {
  //   const { state } = useLocation();
  //   const { item } = state;
  let { permalinks } = useParams();

  const [quizList, setQuizList] = useState([]);
  const { getSpecificQuiz } = useAuth();

  useEffect(() => {
    async function getQuiz() {
      let quiz = await getSpecificQuiz(permalinks);

      setQuizList(quiz[0]);
    }
    getQuiz();
  }, [permalinks]);

  const [correctAnswerDisplay, setCorrectAnswerDisplay] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);

  const handleCheckboxChange = (event, el, qno) => {
    let temp = [];
    let tempQuizList = {};
    if (event.target.checked) {
      //   quizList.questions[qno].checkedOptions.push(el);
      temp = quizList.questions;
      temp[qno].checkedOptions.push(el);
      tempQuizList = {
        ...quizList,
        questions: temp,
      };
      setQuizList(tempQuizList);
    } else {
      var idx = quizList.questions[qno].checkedOptions.indexOf(el);
      if (idx > -1) {
        // quizList.questions[qno].checkedOptions.splice(idx, 1);
        temp = quizList.questions;
        temp[qno].checkedOptions.splice(idx, 1);
        tempQuizList = {
          ...quizList,
          questions: temp,
        };
        setQuizList(tempQuizList);
        // setQuizList({
        //   ...quizList,
        //   questions: [
        //     ...quizList.questions,
        //     quizList.questions[qno].checkedOptions.splice(idx, 1),
        //   ],
        // });
      }
    }
  };

  const handleRadioChange = (event, el, qno) => {
    setRadioValue(event.target.value);
    let temp = [];
    let tempQuizList = {};
    if (event.target.checked) {
      //   quizList.questions[qno].checkedOptions.push(el);
      temp = quizList.questions;
      temp[qno].checkedOptions = [el];
      tempQuizList = {
        ...quizList,
        questions: temp,
      };
      setQuizList(tempQuizList);
      //   setQuizList({
      //     ...quizList,
      //     questions: [
      //       ...quizList.questions,
      //       quizList.questions[qno].checkedOptions.push(el),
      //     ],
      //   });
    }
  };

  const handleAnswerSubmit = () => {
    let totalCorrectAnswer = 0;
    quizList.questions.forEach((val) => {
      if (
        JSON.stringify(val.correctAnswer) === JSON.stringify(val.checkedOptions)
      ) {
        totalCorrectAnswer++;
      }
    });
    setRightAnswer(totalCorrectAnswer);
    setCorrectAnswerDisplay(true);
    setOpenModal(true);
  };

  const handleCloseScoreModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="attemptQuizMain">
      <h3 className="attemptQuizTitle">Title - {quizList.title}</h3>
      <div className="attemptQuizQuestions">
        {quizList?.questions?.map((el, qno) => {
          return (
            <div className="viewQuizQuestionDiv" key={qno}>
              <Typography>
                <span className="viewQuizText">Question {qno + 1} - </span>
                {el.question}
              </Typography>
              <Typography>
                <span className="viewQuizText">Question Type - </span>
                {el.questionType}
              </Typography>
              <Typography className="viewQuizText">Options - </Typography>
              {el?.questionType === "Multiple" &&
                el?.answerOption?.map((el, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      className="attemptQuizTextField"
                      label={el}
                      control={
                        <Checkbox
                          name={el}
                          id={el}
                          key={index}
                          onChange={(event) =>
                            handleCheckboxChange(event, el, qno)
                          }
                          disabled={correctAnswerDisplay}
                        />
                      }
                    />
                  );
                })}
              {el?.questionType === "MCQ" &&
                el?.answerOption?.map((el, index) => {
                  return (
                    <RadioGroup
                      key={index}
                      value={el}
                      onChange={(event) => handleRadioChange(event, el, qno)}
                    >
                      <FormControlLabel
                        key={index}
                        value={el}
                        control={
                          <Radio
                            checked={quizList.questions[
                              qno
                            ].checkedOptions.includes(el)}
                          />
                        }
                        label={el}
                        disabled={correctAnswerDisplay}
                      />
                    </RadioGroup>
                  );
                })}

              {correctAnswerDisplay && (
                <Typography className="viewQuizText">
                  Correct Answer -{" "}
                </Typography>
              )}
              {correctAnswerDisplay &&
                el?.correctAnswer?.map((el, index) => {
                  return (
                    <TextField
                      key={index}
                      className="attemptQuizTextField correctAnswer"
                      label={el}
                      disabled
                    ></TextField>
                  );
                })}
            </div>
          );
        })}
      </div>

      <Modal id="scoreModal" open={openModal} onClose={handleCloseScoreModal}>
        <Box sx={style} className="scoreModalDiv">
          <div className="scoreStatement">
            You answered {rightAnswer} / {quizList?.questions?.length} questions
            correctly.
          </div>
        </Box>
      </Modal>

      <div className="attemptQuizFooter">
        <Button
          className="submitBtn"
          variant="contained"
          onClick={handleAnswerSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AttemptQuiz;
