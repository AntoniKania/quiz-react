import { useContext, useState, useReducer, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import QuizzesContext from "../../store/QuizzesContext";
import UserContext from "../../store/UserContext";
import QuestionCard from "../UI/QuestionCard";
import Scoreboard from "./Scoreboard";
import ResultContext from "../../store/ResultsContext";
import Timer from "./Timer";
import SortQuestion from "./SortQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MatchItemsQuestion from "./MatchItemsQuestion";
import StaticCard from "../UI/StaticCard";

function givenAnswersReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const newArray = state.filter(
        (givenAnswers) => givenAnswers.id !== action.value.id
      );
      return [newArray, action.value];

    case "DELETE":
      return state.filter(
        (givenAnswers) => givenAnswers.id !== action.value.id
      );
  }
}

function PlayQuiz() {
  const { quizzes } = useContext(QuizzesContext);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [setGivenAnswers] = useReducer(givenAnswersReducer, []);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { setResults } = useContext(ResultContext);
  const { user } = useContext(UserContext);
  const submitRef = useRef();

  useEffect(() => {
    //adding to results
    if (showResults) {
      setResults({
        type: "ADD",
        value: { quizId: Number(id), username: user, score: score },
      });
    }
  }, [showResults, currentIndex]);

  function nextQuestionHandler(data) {
    const answer = JSON.parse(data.answer);

    if (answer.isCorrect) {
      setScore((prevScore) => {
        return prevScore + 1;
      });
    }

    if (isLastQuestion()) {
      setShowResults(true);
    }

    setCurrentIndex((currentIndex) => currentIndex + 1);

    setGivenAnswers({
      type: "ADD",
      value: { id: currentIndex, answer: JSON.parse(data.answer) },
    });
  }

  function previousQuestionHandler() {
    setCurrentIndex(() => currentIndex - 1);
  }

  function isLastQuestion() {
    return currentIndex === quizzes[id].questions.length - 1;
  }

  function isFirstQuestion() {
    return currentIndex === 0;
  }

  function renderQuestionSwitch(questionType) {
    switch (questionType) {
      case "singleChoice":
        return (
          <SingleChoiceQuestion
            id={id}
            currentIndex={currentIndex}
            submitRef={submitRef}
            nextQuestionHandler={nextQuestionHandler}
          />
        );
      case "sort":
        return (
          <SortQuestion
            id={id}
            currentIndex={currentIndex}
            submitRef={submitRef}
            nextQuestionHandler={nextQuestionHandler}
          />
        );
      case "matchItems":
        return (
          <MatchItemsQuestion
            id={id}
            currentIndex={currentIndex}
            submitRef={submitRef}
            nextQuestionHandler={nextQuestionHandler}
          />
        );
    }
  }
  return (
    <>
      {showResults ? (
        <StaticCard>
          <h1>{"Your score: " + score}</h1>
          <Scoreboard id={id} />
        </StaticCard>
      ) : (
        <QuestionCard
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          nextQuestionHandler={nextQuestionHandler}
          previousQuestionHandler={previousQuestionHandler}
          submitRef={submitRef}
          id={id}
        >
          {quizzes[id].timePerQuestion > 0 && (
            <Timer
              key={currentIndex}
              time={quizzes[id].timePerQuestion}
              currentIndex={currentIndex}
              outOfTime={() =>
                nextQuestionHandler({ answer: '{"isCorrect":false}' })
              }
            />
          )}
          {renderQuestionSwitch(quizzes[id].questions[currentIndex].type)}
        </QuestionCard>
      )}
    </>
  );
}

export default PlayQuiz;
