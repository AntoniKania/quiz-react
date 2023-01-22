import StaticCard from "../UI/StaticCard";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import QuizzesContext from "../../store/QuizzesContext";
import { Link } from "react-router-dom";
import Scoreboard from "./Scoreboard";

function StartQuiz() {
  const { quizzes } = useContext(QuizzesContext);
  let { id } = useParams();

  return (
    <StaticCard>
      <h1>{quizzes[id].name}</h1>
      <p>{"Description: " + quizzes[id].description}</p>
      <Scoreboard id={id} />
      <p>Number of questions: {quizzes[id].questions.length}</p>
      <Link to={"/play-quiz/" + id}>
        <button>Play</button>
      </Link>
    </StaticCard>
  );
}

export default StartQuiz;
