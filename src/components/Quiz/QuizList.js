import Card from "../UI/Card";
import React, { useContext } from "react";
import QuizzesContext from "../../store/QuizzesContext";
import { Link } from "react-router-dom";
import "./QuizList.css";

function QuizList() {
  const { quizzes } = useContext(QuizzesContext);
  function playQuizHandler(input) {}
  return quizzes.map((quiz) => {
    return (
      <ul>
        <li>
          <Card
            className="quiz-list"
            key={quiz.id}
            id={quiz.id}
            onClick={playQuizHandler}
          >
            {console.log(quiz)}
            <Link className="link" to={"/quizzes/" + quiz.id}>
              <h1>{quiz.name}</h1>
              <p>{quiz.description}</p>
            </Link>
          </Card>
        </li>
      </ul>
    );
  });
}

export default QuizList;
