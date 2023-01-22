import { useContext } from "react";
import { useForm } from "react-hook-form";
import QuizzesContext from "../../store/QuizzesContext";

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
      className="single-choice-question-form"
      onSubmit={handleSubmit(nextQuestionHandler)}
    >
      <h1>{quizzes[id].questions[currentIndex].query}</h1>
      <div className="answers">
        {quizzes[id].questions[currentIndex].answers.map((answer, a) => (
          <div className={"answer" + a} key={a}>
            <input
              key={answer.content}
              type="radio"
              name="answer"
              value={JSON.stringify(answer)}
              {...register("answer")}
            />
            <label htmlFor={answer.content}>{answer.content}</label> <br />
          </div>
        ))}
      </div>
      <button ref={submitRef} type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default SingleChoiceQuestion;
