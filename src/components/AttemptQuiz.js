import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./AttemptQuiz.css";

const AttemptQuiz = () => {
  const quizList = {
    title: "1st quiz",
    permalinks: "AQSWDE",
    questions: [
      {
        question: "How are you?",
        questionType: "MCQ",
        answerOption: ["Good", "Bad", "Okay"],
        correctAnswer: ["Good"],
      },
      {
        question: "Where do you visited?",
        questionType: "Multiple",
        answerOption: ["Mumbai", "Pune", "Goa"],
        correctAnswer: ["Mumbai", "Pune"],
      },
      {
        question: "How are you?",
        questionType: "Multiple",
        answerOption: ["Good", "Bad", "Okay", "Sad"],
        correctAnswer: ["Good", "Okay"],
      },
      {
        question: "Where do you visited?",
        questionType: "Multiple",
        answerOption: ["Mumbai", "Pune", "Goa"],
        correctAnswer: ["Mumbai", "Pune"],
      },
    ],
  };

  const [correctAnswerDisplay, setCorrectAnswerDisplay] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [checked, setChecked] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleCheckboxChange = (index) => {};

  const handleAnswerSubmit = () => {
    console.log("clicked");
    setCorrectAnswerDisplay(true);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div className="attemptQuizMain">
      <h3 className="attemptQuizTitle">Title - {quizList.title}</h3>
      <div className="attemptQuizQuestions">
        {quizList.questions.map((el, index) => {
          return (
            <div className="viewQuizQuestionDiv" key={index}>
              <Typography>
                <span className="viewQuizText">Question {index + 1} - </span>
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
                          key={index}
                          checked={true}
                          onChange={() => handleCheckboxChange(index)}
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
                      value={radioValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        key={index}
                        value={el}
                        control={<Radio />}
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
                el?.correctAnswer?.map((el) => {
                  return (
                    <TextField
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
