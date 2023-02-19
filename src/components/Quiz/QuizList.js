import Card from "../UI/Card";
import React, { useContext } from "react";
import QuizzesContext from "../../store/QuizzesContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./QuizList.module.css";

function QuizList() {
  const { quizzes } = useContext(QuizzesContext);
  const navigate = useNavigate();

  function playQuizHandler(quizId) {
    navigate(`/quizzes/${quizId}`);
  }

  return quizzes.map((quiz) => {
    return (
      <ul>
        <li>
          <Card
            className={styles["quiz-list"]}
            key={quiz.id}
            id={quiz.id}
            onClick={() => playQuizHandler(quiz.id)}
          >
            {console.log(quizzes)}
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
