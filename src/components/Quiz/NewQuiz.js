import React, { useContext, useReducer, useState } from "react";
import NewQuestion from "./NewQuestion";
import { useForm } from "react-hook-form";
import QuizzesContext from "../../store/QuizzesContext";
import UserContext from "../../store/UserContext";
import StaticCard from "../UI/StaticCard";
import "./NewQuiz.css";

const answers = [
  { id: 0, content: "", isCorrect: false },
  { id: 1, content: "", isCorrect: false },
  { id: 2, content: "", isCorrect: false },
  { id: 3, content: "", isCorrect: false },
];

const options = [
  { id: 0, checked: false },
  { id: 1, checked: false },
  { id: 2, checked: false },
  { id: 3, checked: false },
];

function newQuizReducer(state, action) {
  if (action.type === "ADD") {
    return {
      ...state,
      id: state.length,
      name: action.val.name,
      description: action.val.description,
      timePerQuestion: action.val.timePerQuestion,
      questions: action.val.questions,
      creationDate: Date.now(),
      correctAnswers: action.val.correctAnswers,
    };
  } else {
  }
}

function NewQuiz() {
  const { quizzes, setQuizzes } = useContext(QuizzesContext);
  const [newQuiz, setNewQuiz] = useReducer(newQuizReducer, {
    id: 12,
    name: "",
    description: "",
    timePerQuestion: 0,
    creationDate: "cos",
    questions: [],
  });
  const [newQuizSettings, setNewQuizSettings] = useState();

  const { user } = useContext(UserContext);

  const [isAddingQuestions, setIsAddingQuestions] = useState(false);

  const { handleSubmit, register, getValues } = useForm();

  function quizOptionsSubmitHandler(data) {
    setNewQuiz({ type: "ADD", val: data });
    setIsAddingQuestions(true);
  }

  function quizSubmitHadler(data) {
    setQuizzes({
      type: "ADD",
      quiz: {
        id: quizzes.length,
        name: newQuizSettings.name,
        description: newQuizSettings.description,
        canGoBack: newQuizSettings.canGoBack,
        negativePoints: newQuizSettings.negativePoints,
        timePerQuestion: newQuizSettings.timePerQuestion,
        randomOrderQuestions: false,
        randomOrderAnswers: false,
        timePerQuestion: data.timePerQuestion,
        creationDate: Date.now(),
        author: user,
        questions: data.questions,
      },
    });
  }

  function quizOptionsSubmitHandler(data) {
    setNewQuizSettings(data);
    setIsAddingQuestions(true);
  }

  if (isAddingQuestions) {
    return <NewQuestion onQuizSubmit={quizSubmitHadler} />;
  }

  return (
    <StaticCard className="new-quiz">
      <form
        className="new-quiz"
        onSubmit={handleSubmit(quizOptionsSubmitHandler)}
      >
        <h1>{newQuiz.name}</h1>
        <label>Insert name for your quiz</label>
        <br />
        <input
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Please enter a name of your quiz.",
            },
          })}
        />
        <br />
        <label>Insert description for your quiz</label>
        <br />
        <input type="text" {...register("description")} />
        <br />
        <label>Time limit per question (s.)</label>
        <br />
        <input type="number" {...register("timePerQuestion")} />
        <br />
        <input
          type="checkbox"
          id="can-go-back"
          name="can-go-back"
          {...register("canGoBack")}
        />
        <label for="negative-points">Negative points for wrong answers</label>
        <br />
        <input
          type="checkbox"
          id="negative-points"
          name="negative-points"
          {...register("negativePoints")}
        />
        <label for="negative-points">Player can go to previous question</label>
        <br />
        <input
          type="checkbox"
          id="random-order-questions"
          name="random-order-questions"
          {...register("randomOrderQuestions")}
        />
        <label>Questions should be dislpayed in random order</label>
        <br />
        <input
          type="checkbox"
          id="random-order-answers"
          name="random-order-answers"
          {...register("randomOrderAnswers")}
        />
        <label>Anwers should be dislpayed in random order</label>
        <br />
        <button type="submit">Accept Setting and Add Questions</button>
      </form>
    </StaticCard>
  );
}

export default NewQuiz;
