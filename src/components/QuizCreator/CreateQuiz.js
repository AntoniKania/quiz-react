import React, { useContext, useReducer, useState } from "react";
import NewQuestion from "./NewQuestion";
import { useForm } from "react-hook-form";
import QuizzesContext from "../../store/QuizzesContext";
import UserContext from "../../store/UserContext";
import StaticCard from "../UI/StaticCard";
import QuizSettings from "./QuizSettings";

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

  const { handleSubmit, register } = useForm();

  function quizOptionsSubmitHandler(data) {
    console.log(data);
    setNewQuiz({ type: "ADD", val: data });
    setNewQuizSettings();
    setIsAddingQuestions(true);
  }

  function quizSubmitHadler(questions) {
    console.log(questions);
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
        timePerQuestion: newQuizSettings.timePerQuestion,
        creationDate: Date.now(),
        author: user,
        questions: questions,
      },
    });
  }

  function quizSettingsSubmitHandler(data) {
    setNewQuizSettings({
      name: data.name,
      description: data.description,
      timePerQuestion: data.timePerQuestion,
      negativePoints: data.negativePoints,
      canGoBack: data.canGoBack,
      randomOrderQuestions: data.randomOrderQuestions,
      randomOrderAnswers: data.randomOrderAnswers,
    });
  }

  if (!newQuizSettings) {
    return <QuizSettings onSettingsSubmit={quizSettingsSubmitHandler} />;
  }

  return (
    <>
      <StaticCard>
        <NewQuestion onQuizSubmit={quizSubmitHadler} />
      </StaticCard>
    </>
  );
}

export default NewQuiz;
