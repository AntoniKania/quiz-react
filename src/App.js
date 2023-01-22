import QuizList from "./components/Quiz/QuizList";
import NewQuiz from "./components/Quiz/NewQuiz";
import { Route, Routes, Navigate } from "react-router-dom";
import { useReducer, useState } from "react";
import StartQuiz from "./components/Quiz/StartQuiz";
import QuizzesContext from "./store/QuizzesContext";
import PlayQuiz from "./components/Quiz/PlayQuiz";
import UserContext from "./store/UserContext";
import ResultContext from "./store/ResultsContext";
import LoginPopup from "./components/User/LoginPopup";
import MainHeader from "./components/Nav/MainHeader";

import "./App.css";

const INIT_RESULTS = [
  { quizId: 0, username: "wojtek2", score: 2 },
  { quizId: 0, username: "Stefan", score: 4 },
  { quizId: 0, username: "Zbigniew", score: 3 },
  { quizId: 1, username: "graczzz", score: 5 },
  { quizId: 1, username: "user", score: 6 },
  { quizId: 1, username: "Stefan", score: 4 },
  { quizId: 1, username: "Zbigniew", score: 3 },
  { quizId: 0, username: "graczzz", score: 5 },
  { quizId: 0, username: "user", score: 6 },
];

const DEFAULT_QUIZZES = [
  {
    id: 0,
    name: "Pytania o pociagach",
    description: "Najlepszy quiz o pociagach na swiecie!",
    canGoBack: true,
    negativePoints: false,
    randomOrderQuestions: false,
    randomOrderAnswers: false,
    timePerQuestion: 20,
    creationDate: Date.now(),
    author: "Kasia",
    questions: [
      {
        query: "Jaki jest najlepszy pociag?",
        type: "singleChoice",
        answers: [
          { content: "szybki", isCorrect: true },
          { content: "wolny", isCorrect: false },
          { content: "brzydki", isCorrect: false },
          { content: "stary", isCorrect: false },
        ],
        points: 1,
      },
      {
        query: "Pociąg z którego roku jest najnowszy?",
        type: "singleChoice",
        answers: [
          { content: "1952", isCorrect: false },
          { content: "1964", isCorrect: false },
          { content: "1999", isCorrect: true },
          { content: "1987", isCorrect: false },
        ],
        points: 1,
      },
      {
        query:
          "Posortuj pociągi w kolejności od najszybszego do najwolniejszego",
        type: "sort",
        answers: [
          { id: 0, content: "Maglev, 460 km/h", isCorrect: false },
          { id: 1, content: "KTX, 305 km/h.", isCorrect: false },
          { id: 2, content: "CR400 Fuxing, 350 km/h", isCorrect: false },
          { id: 3, content: "AVE S-103, 310 km/h", isCorrect: false },
        ],
        correctOrder: [0, 2, 3, 1],
        points: 1,
      },
      {
        query: "Match train with country",
        type: "matchItems",
        answers: [
          { id: 0, content: "Maglev", column: "leftColumn" },
          { id: 1, content: "JR East E5", column: "leftColumn" },
          { id: 2, content: "TGV", column: "leftColumn" },
          { id: 3, content: "AVE S-103", column: "leftColumn" },
          { id: 4, content: "France", column: "rightColumn" },
          { id: 5, content: "Spain", column: "rightColumn" },
          { id: 6, content: "Japan", column: "rightColumn" },
          { id: 7, content: "China", column: "rightColumn" },
        ],
        correctSet: [
          [0, 7],
          [2, 5],
          [1, 6],
          [3, 5],
        ],
        points: 2,
      },
    ],
  },
  {
    id: 1,
    name: "Pytania o pociagach 2",
    description: "Jeszcze lepszy quiz o pociagach!!!",
    timePerQuestion: 0,
    canGoBack: true,
    negativePoints: false,
    creationDate: Date.now(),
    author: "Zbigniew",
    questions: [
      {
        query: "Jaki jest pociag?",
        type: "multipleChoice",
        answers: [
          { content: "szybki", isCorrect: true },
          { content: "wolny", isCorrect: false },
          { content: "brzydki", isCorrect: false },
          { content: "nowy", isCorrect: true },
        ],
      },
    ],
  },
];

function quizzesReducer(state, action) {
  if (action.type === "ADD") {
    return [...state, action.quiz];
  }
}

function resultReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.value];
  }
}

function App() {
  const [quizzes, setQuizzes] = useReducer(quizzesReducer, DEFAULT_QUIZZES);
  const [results, setResults] = useReducer(resultReducer, INIT_RESULTS);
  const [user, setUser] = useState("Zbigniew");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let name = localStorage.getItem("name");

  if (name !== null && !isLoggedIn) {
    setUser(name);
    setIsLoggedIn(true);
  }

  function loginHandler(data) {
    setUser(data.name);
    setIsLoggedIn(true);
    localStorage.setItem("isLogged", "1");
    localStorage.setItem("name", data.name);
  }

  return (
    <QuizzesContext.Provider value={{ quizzes, setQuizzes }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ResultContext.Provider value={{ results, setResults }}>
          <div className="App">
            <MainHeader setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <LoginPopup triggered={!isLoggedIn} onLogin={loginHandler} />
            <Routes>
              <Route path="/" element={<Navigate to="/quizzes" />}></Route>
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quizzes/:id" element={<StartQuiz />} />
              <Route path="/create-quiz" element={<NewQuiz />} />
              <Route path="/play-quiz/:id" element={<PlayQuiz />} />
            </Routes>
          </div>
        </ResultContext.Provider>
      </UserContext.Provider>
    </QuizzesContext.Provider>
  );
}

export default App;
