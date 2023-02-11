import { useContext } from "react";
import Table from "../UI/Table";
import ResultContext from "../../store/ResultsContext";
import UserContext from "../../store/UserContext";
import styles from "./Scoreboard.module.css";

function compareScores(a, b) {
  if (a.score > b.score) return -1;
  if (b.score > a.score) return 1;
  return 0;
}

function Storeboard(props) {
  const { results } = useContext(ResultContext);
  const { user } = useContext(UserContext);
  const id = Number(props.id);

  return (
    <Table>
      <caption>Top 5</caption>
      <tr>
        <th>Place</th>
        <th>Name</th>
        <th>Score</th>
      </tr>
      {results
        .filter((res) => res.quizId === id)
        .sort(compareScores)
        .slice(0, 5)
        .map((result, i) => {
          return (
            <tr key={i}>
              <td>{i + 1 + "."}</td>
              <td>{result.username}</td>
              <td>{result.score}</td>
            </tr>
          );
        })}
      {results
        .filter((result) => result.quizId === Number(id))
        .findIndex((result) => result.username === user) >= 0 && (
        <div className={styles["players-place"]}>
          <span>Twoje miejsce w tabeli:</span>
          <p>
            {results
              .filter((result) => result.quizId === Number(id))
              .sort(compareScores)
              .findIndex((result) => result.username === user) + 1}
          </p>
        </div>
      )}
    </Table>
  );
}

export default Storeboard;
