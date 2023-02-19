import { useForm } from "react-hook-form";
import styles from "./QuizSettings.module.css";
import StaticCard from "../UI/StaticCard";

function QuizSettings(props) {
  const { handleSubmit, register } = useForm();

  return (
    <StaticCard className={styles["new-quiz"]}>
      <form
        className={styles["new-quiz"]}
        onSubmit={handleSubmit(props.onSettingsSubmit)}
      >
        <label>Insert name for your quiz</label>
        <br />
        <input
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Please enter a name of your quiz.",
            },
          })}
        />
        <br />
        <label>Insert description for your quiz</label>
        <br />
        <input type="text" {...register("description")} />
        <br />
        <label>Time limit per question (s.)</label>
        <br />
        <input type="number" {...register("timePerQuestion")} />
        <br />
        <input
          type="checkbox"
          id="can-go-back"
          name="can-go-back"
          {...register("canGoBack")}
        />
        <label for="negative-points">Negative points for wrong answers</label>
        <br />
        <input
          type="checkbox"
          id="negative-points"
          name="negative-points"
          {...register("negativePoints")}
        />
        <label for="negative-points">Player can go to previous question</label>
        <br />
        <input
          type="checkbox"
          id="random-order-questions"
          name="random-order-questions"
          {...register("randomOrderQuestions")}
        />
        <label>Questions should be dislpayed in random order</label>
        <br />
        <input
          type="checkbox"
          id="random-order-answers"
          name="random-order-answers"
          {...register("randomOrderAnswers")}
        />
        <label>Anwers should be dislpayed in random order</label>
        <br />
        <button type="submit">Accept Settings and Add Questions</button>
      </form>
    </StaticCard>
  );
}

export default QuizSettings;
