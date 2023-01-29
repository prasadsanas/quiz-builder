import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import "./CreateQuiz.css";
import Question from "./Question";

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

const CreateQuiz = (props) => {
  const [noOfQuestion, setNoOfQuestion] = useState([{ id: 1 }]);
  const [questionObject, setQuestionObject] = useState([]);
  const [count, setCount] = useState(1);
  const [disabledPublishBtn, setDisabledPublishBtn] = useState(true);
  const { saveQuiz, getAllQuiz } = useAuth();
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    questions: [],
  });

  const handlePublish = async () => {
    let payload = quizDetails;
    await saveQuiz(payload);
    setNoOfQuestion([{ id: 1 }]);
    setCount(1);
    getAllQuiz();
    props.onClose();
    setQuizDetails({
      permalinks: "",
      title: "",
      questions: [],
    });
  };
  const handleSave = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    setQuizDetails({
      ...quizDetails,
      questions: [...quizDetails.questions, questionObject],
      permalinks: result,
    });
    setDisabledPublishBtn(false);
  };
  const handleAddQuestion = () => {
    setQuizDetails({
      ...quizDetails,
      questions: [...quizDetails.questions, questionObject],
    });
    if (count < 10) {
      setCount(count + 1);
      setNoOfQuestion((noOfQuestion) => [
        ...noOfQuestion,
        { id: noOfQuestion.length + 1 },
      ]);
    } else {
      alert("Maximum 10 questions are allowed.");
    }
  };

  const handleTitleChange = (event) => {
    setQuizDetails({
      ...quizDetails,
      title: event.target.value,
    });
  };

  return (
    <div id="createQuizMain">
      <Modal id="quizModal" open={props.openModal} onClose={props.onClose}>
        <Box sx={style} className="modalDiv">
          <div className="addQuestionDiv">
            <Typography className="title">Title</Typography>
            <TextField
              className="quizTitle"
              label="Enter your question"
              variant="outlined"
              onBlur={handleTitleChange}
              disabled={!disabledPublishBtn}
              required
            ></TextField>
            <Button
              className="addQuestionBtn"
              variant="outlined"
              onClick={handleAddQuestion}
              disabled={!disabledPublishBtn}
            >
              Add question
            </Button>
          </div>
          <div className="questionDiv">
            {noOfQuestion.map((el, index) => {
              return (
                <Question
                  key={index}
                  count={el.id}
                  setQuestionObject={setQuestionObject}
                  disabled={!disabledPublishBtn}
                />
              );
            })}
          </div>
          <div className="publishBtn">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!disabledPublishBtn}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={handlePublish}
              disabled={disabledPublishBtn}
            >
              Publish
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateQuiz;
