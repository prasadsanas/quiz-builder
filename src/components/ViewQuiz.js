import { Box, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import "./ViewQuiz.css";

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

const ViewQuiz = (props) => {
  return (
    <div id="viewQuizMain">
      <Modal id="quizModal" open={props.openModal} onClose={props.onClose}>
        <Box sx={style} className="modalDiv">
          <Typography className="viewQuizTitle">
            Title - {props.item.title}
          </Typography>
          {props.item.questions.map((el, index) => {
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
                {el.answerOption.map((el) => {
                  return (
                    <TextField
                      className="viewQuizTextField"
                      disabled
                      label={el}
                    ></TextField>
                  );
                })}

                <Typography className="viewQuizText">
                  Correct Answer -{" "}
                </Typography>
                {el.correctAnswer.map((el) => {
                  return (
                    <TextField
                      className="viewQuizTextField"
                      disabled
                      label={el}
                    ></TextField>
                  );
                })}
              </div>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default ViewQuiz;
