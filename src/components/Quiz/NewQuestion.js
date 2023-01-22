import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StaticCard from "../UI/StaticCard";

const initialQuestion = {
  query: "",
  type: "singleChoice",
  answers: [
    { content: "", isCorrect: false },
    { content: "", isCorrect: false },
    { content: "", isCorrect: false },
    { content: "", isCorrect: false },
  ],
  correctAnswer: [],
};

function NewQuestion(props) {
  const [questions, setQuestions] = useState([initialQuestion]);
  const { handleSubmit, register } = useForm();

  function addNextQuestionHandler() {
    setQuestions((prevQuestions) => {
      return [...prevQuestions, initialQuestion];
    });
  }

  return (
    <StaticCard className="new-question">
      <form
        className="new-question-form"
        onSubmit={handleSubmit(props.onQuizSubmit)}
      >
        {questions.map((questions, q) => {
          return (
            <div className="adding-questions-form" key={q}>
              <label>Type of question</label>
              <select
                name="question-type"
                {...register("questions[" + q + "].type")}
              >
                <option value="single-choice">Single Choice</option>
                <option value="multiple-choice">Muliple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-the-gap">Fill The Gap</option>
                <option value="sort">Sort</option>
                <option value="match">Match Elements</option>
              </select>{" "}
              <br />
              <label for="query">Insert question</label>
              <input
                type="text"
                {...register("questions[" + q + "].query", { required: true })}
                placeholder="Question"
              />
              <br />
              {questions.answers.map((answer, a) => {
                return (
                  <div className="question" key={a}>
                    <input type="radio" id="0" name="is-correct" value="0" />
                    <input
                      {...register("questions[" + q + "].answers[" + a + "]", {
                        required: true,
                      })}
                      placeholder={"Answer " + (a + 1)}
                    />
                    <br />
                  </div>
                );
              })}
            </div>
          );
        })}
        <button type="button" onClick={addNextQuestionHandler}>
          Add Next Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </StaticCard>
  );
}

export default NewQuestion;
