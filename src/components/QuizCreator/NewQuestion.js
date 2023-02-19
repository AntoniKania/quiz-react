import React, { useState, useRef, useEffect } from "react";
import StaticCard from "../UI/StaticCard";
import NewSingleChoice from "./NewSingleChoice";
import styles from "./NewQuestion.module.css";

function NewQuestion(props) {
  const [questions, setQuestions] = useState([]);
  const [createQuiz, setCreateQuiz] = useState(false);
  const [addNextQuestion, setAddNextQuestion] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const submitRef = useRef();
  const clearFormRef = useRef();

  useEffect(() => {
    createQuiz && props.onQuizSubmit(questions);
  }, [questions]);

  useEffect(() => {
    addNextQuestion && setResetForm(true);
  }, [questions]);

  function addQuestion(data) {
    const correctAnswerIndex = +data.isCorrect;
    data.answers[correctAnswerIndex].isCorrect = true;
    delete data.isCorrect;
    console.log(data);
    setQuestions((prevQuestions) => {
      return [...prevQuestions, data];
    });
  }

  /*TODO
  render: choose type of question
  switch(questionType)
    case: singleChoice
        <NewSingleChoice />
    case: ....
  */

  return (
    <StaticCard className="new-question">
      <NewSingleChoice
        questions={questions}
        submitRef={submitRef}
        clearFormRef={clearFormRef}
        onQuizSubmit={addQuestion}
        resetForm={resetForm}
        setResetForm={setResetForm}
      />
      <div className={styles["control-group"]}>
        <button
          type="button"
          onClick={() => {
            submitRef.current.click();
            setAddNextQuestion(true);
          }}
        >
          Add Next Question
        </button>
        <button
          onClick={() => {
            submitRef.current.click();
            setCreateQuiz(true);
          }}
        >
          Create Quiz
        </button>
      </div>
    </StaticCard>
  );
}

export default NewQuestion;
