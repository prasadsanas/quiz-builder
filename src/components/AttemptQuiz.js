import {
  Button,
  Checkbox,
  FormControlLabel,
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
        checkedOptions: [],
      },
      {
        question: "Where do you visited?",
        questionType: "Multiple",
        answerOption: ["Mumbai", "Pune", "Goa"],
        correctAnswer: ["Mumbai", "Pune"],
        checkedOptions: [],
      },
      {
        question: "How are you?",
        questionType: "Multiple",
        answerOption: ["Good", "Bad", "Okay", "Sad"],
        correctAnswer: ["Good", "Okay"],
        checkedOptions: [],
      },
      {
        question: "Where do you visited?",
        questionType: "Multiple",
        answerOption: ["Mumbai", "Pune", "Goa"],
        correctAnswer: ["Mumbai", "Pune"],
        checkedOptions: [],
      },
    ],
  };

  const [correctAnswerDisplay, setCorrectAnswerDisplay] = useState(false);
  const [radioValue, setRadioValue] = useState("");

  const handleCheckboxChange = (event, el, qno) => {
    // console.log(el, index, qno, event.target.checked, event);
    if (event.target.checked) {
      quizList.questions[qno].checkedOptions.push(el);
    } else {
      console.log("false");
      var idx = quizList.questions[qno].checkedOptions.indexOf(el);
      if (idx > -1) {
        quizList.questions[qno].checkedOptions.splice(idx, 1);
      }
    }
  };

  const handleAnswerSubmit = () => {
    console.log("clicked");
    setCorrectAnswerDisplay(true);
  };

  const handleRadioChange = (event, el, qno) => {
    setRadioValue(event.target.value);
    if (event.target.checked) {
      quizList.questions[qno].checkedOptions.push(el);
    } else {
      console.log("false");
      var idx = quizList.questions[qno].checkedOptions.indexOf(el);
      if (idx > -1) {
        quizList.questions[qno].checkedOptions.splice(idx, 1);
      }
    }

    console.log(quizList.questions[qno].checkedOptions);
  };

  return (
    <div className="attemptQuizMain">
      <h3 className="attemptQuizTitle">Title - {quizList.title}</h3>
      <div className="attemptQuizQuestions">
        {quizList.questions.map((el, qno) => {
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
                            handleCheckboxChange(event, el, index, qno)
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
                      value={radioValue}
                      onChange={(event) =>
                        handleRadioChange(event, el, index, qno)
                      }
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
