import { Switch, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Question.css";

const Question = (props) => {
  const [questionType, setQuestionType] = useState("MCQ");
  const [questionDetail, setQuestionDetail] = useState({
    question: "",
    questionType: "MCQ",
    answerOption: "",
    correctAnswer: "",
    checkedOptions: [],
  });

  useEffect(() => {
    props.setQuestionObject(questionDetail);
  }, [questionDetail]);

  const handleQuestionChange = (event) => {
    setQuestionDetail({
      ...questionDetail,
      question: event.target.value,
    });
  };

  const handleQuestionType = () => {
    if (questionType === "MCQ") {
      setQuestionType("Multiple");
      setQuestionDetail({
        ...questionDetail,
        questionType: "Multiple",
      });
    } else {
      setQuestionType("MCQ");
      setQuestionDetail({
        ...questionDetail,
        questionType: "MCQ",
      });
    }
  };

  const handleOptionChange = (event) => {
    let optionArray = event.target.value.split(",");

    setQuestionDetail({
      ...questionDetail,
      answerOption: optionArray,
    });
  };

  const handleCorrectAnswerChange = (event) => {
    let answerArray = event.target.value.split(",");
    setQuestionDetail({
      ...questionDetail,
      correctAnswer: answerArray,
    });
  };

  return (
    <div className="questionMainDiv">
      <div className="questionFirstRow">
        <Typography className="serialNo">{props.count}</Typography>
        <TextField
          className="inputQuestion"
          label="Enter your question"
          variant="outlined"
          onChange={handleQuestionChange}
          required
          disabled={props.disabled}
        ></TextField>
      </div>
      <div className="questionType">
        <Typography className="questionTypeOption">MCQ</Typography>
        <Switch
          size="small"
          color="secondary"
          onChange={handleQuestionType}
          disabled={props.disabled}
        ></Switch>
        <Typography className="questionTypeOption">Multiple Answers</Typography>
      </div>
      <div className="multipleOptions">
        <TextField
          className="inputOptions"
          label="Enter all options separated with commas"
          variant="outlined"
          onChange={handleOptionChange}
          required
          disabled={props.disabled}
        ></TextField>
      </div>
      <div className="correctAnswer">
        <TextField
          className="inputCorrectAnswer"
          label="Enter all correct options separated with commas"
          variant="outlined"
          onChange={handleCorrectAnswerChange}
          disabled={props.disabled}
          required
        ></TextField>
      </div>
    </div>
  );
};

export default Question;
