import { Modal, Box, Button } from "@mui/material";
import React from "react";
import "./CreateQuiz.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateQuiz = (props) => {
  const handlePublish = () => {
    props.onClose();
  };
  return (
    <div id="createQuizMain">
      <Modal id="quizModal" open={props.openModal} onClose={props.onClose}>
        <Box sx={style}>
          <h3>Title</h3>
          <div className="publishBtn">
            <Button variant="contained" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateQuiz;
