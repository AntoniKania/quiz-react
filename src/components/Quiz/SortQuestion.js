import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import QuizzesContext from "../../store/QuizzesContext";
import MovableComponent from "../UI/MovableComponent";

function SortQuestion({ id, currentIndex, submitRef, nextQuestionHandler }) {
  const { quizzes } = useContext(QuizzesContext);
  const { handleSubmit } = useForm();

  const [components, setComponents] = useState(
    quizzes[id].questions[currentIndex].answers
  );

  function moveElement(fromIndex, toIndex) {
    const arrCopy = [...components];
    let element = arrCopy[fromIndex];
    arrCopy.splice(fromIndex, 1);
    arrCopy.splice(toIndex, 0, element);

    return arrCopy;
  }

  function moveUp(index) {
    if (index === 0) return;
    setComponents(moveElement(index, index - 1));
  }

  function moveDown(index) {
    if (index === components.length - 1) return;
    setComponents(moveElement(index, index + 1));
  }

  function validateAnswers() {
    const correctIdsOrder = quizzes[id].questions[currentIndex].correctOrder;
    const actualIdsOrder = components.map((component) => component.id);
    correctIdsOrder.toString() === actualIdsOrder.toString()
      ? nextQuestionHandler({ answer: '{"isCorrect":true}' })
      : nextQuestionHandler({ answer: '{"isCorrect":false}' });
  }

  return (
    <form onSubmit={handleSubmit(validateAnswers)}>
      <h1>{quizzes[id].questions[currentIndex].query}</h1>
      {components.map((component, i) => {
        return (
          <MovableComponent
            key={i}
            index={i}
            content={component.content}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      })}
      <button ref={submitRef} type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default SortQuestion;
