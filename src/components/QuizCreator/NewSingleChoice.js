import { useEffect } from "react";
import { useForm } from "react-hook-form";

const QUESTION_TEMPLATE = {
  query: "",
  type: "singleChoice",
  answers: [
    { content: "", isCorrect: false },
    { content: "", isCorrect: false },
    { content: "", isCorrect: false },
    { content: "", isCorrect: false },
  ],
};

function NewSingleChoice(props) {
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    reset(QUESTION_TEMPLATE);
    return () => {
      props.setResetForm(false);
    };
  }, [props.resetForm]);

  return (
    <form
      className="new-question-form"
      onSubmit={handleSubmit(props.onQuizSubmit)}
    >
      <div className="adding-questions-form">
        <label>Type of question</label>
        <select name="question-type" {...register("type")}>
          <option value="single-choice">Single Choice</option>
          <option value="multiple-choice">Muliple Choice</option>
          <option value="true-false">True/False</option>
          <option value="fill-the-gap">Fill The Gap</option>
          <option value="sort">Sort</option>
          <option value="match">Match Elements</option>
        </select>{" "}
        <br />
        <label for="query">Insert question</label>
        <input
          type="text"
          {...register("query", { required: true })}
          placeholder="Question"
        />
        <br />
        {QUESTION_TEMPLATE.answers.map((answer, a) => {
          return (
            <div className="question" key={a}>
              <input
                type="radio"
                id={0}
                name="is-correct"
                value={a}
                checked="checked"
                {...register(`isCorrect`)}
              />
              <input
                {...register("answers[" + a + "].content", {
                  required: true,
                })}
                placeholder={"Answer " + (a + 1)}
              />
              <br />
            </div>
          );
        })}
      </div>
      <button ref={props.submitRef} type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default NewSingleChoice;
