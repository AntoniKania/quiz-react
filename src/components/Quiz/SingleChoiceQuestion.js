import { useContext } from "react";
import { useForm } from "react-hook-form";
import QuizzesContext from "../../store/QuizzesContext";
import styles from "./SingleChoiceQuestion.module.css";

function SingleChoiceQuestion({
  id,
  currentIndex,
  submitRef,
  nextQuestionHandler,
}) {
  const { quizzes } = useContext(QuizzesContext);
  const { register, handleSubmit } = useForm();

  return (
    <form
      className={styles["single-choice-question-form"]}
      onSubmit={handleSubmit(nextQuestionHandler)}
    >
      <h1>{quizzes[id].questions[currentIndex].query}</h1>
      <div className={styles.answers}>
        {quizzes[id].questions[currentIndex].answers.map((answer, a) => (
          <div className={styles.answer} key={a}>
            <input
              key={answer.content}
              type="radio"
              name="answer"
              className="radio-button"
              value={JSON.stringify(answer)}
              {...register("answer")}
            />
            <label htmlFor={answer.content} className="answer-label">
              {answer.content}
            </label>{" "}
            <br />
          </div>
        ))}
      </div>
      <button ref={submitRef} type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default SingleChoiceQuestion;
