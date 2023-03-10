import QuizzesContext from "../../store/QuizzesContext";
import { useContext } from "react";
import StaticCard from "./StaticCard";
import styles from "./QuestionCard.module.css";

const QuestionCard = (props) => {
  const { quizzes } = useContext(QuizzesContext);

  return (
    <StaticCard>
      {props.children}
      <div className={styles["control-group"]}>
        {quizzes[props.id].canGoBack && !props.isFirstQuestion() && (
          <button type="button" onClick={props.previousQuestionHandler}>
            Previous Question
          </button>
        )}
        {!props.isLastQuestion() ? (
          <button onClick={() => props.submitRef.current.click()}>
            Next Question
          </button>
        ) : (
          <button onClick={() => props.submitRef.current.click()}>
            Submit
          </button>
        )}
      </div>
    </StaticCard>
  );
};

export default QuestionCard;
