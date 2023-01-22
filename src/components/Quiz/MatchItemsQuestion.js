import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import QuizzesContext from "../../store/QuizzesContext";
import MovableComponent from "./MovableComponent";
import Table from "../UI/Table";

function compareAnswers(a, b) {
  if (a[0] > b[0]) return -1;
  if (b[0] > a[0]) return 1;
  return 0;
}

function SortQuestion({ id, currentIndex, submitRef, nextQuestionHandler }) {
  const { quizzes } = useContext(QuizzesContext);
  const { handleSubmit } = useForm();
  const [components, setComponents] = useState(
    quizzes[id].questions[currentIndex].answers
  );
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);

  useEffect(() => {
    setLeftColumn(
      components.filter((component) => component.column === "leftColumn")
    );
    setRightColumn(
      components.filter((component) => component.column === "rightColumn")
    );
  }, []);

  function moveElement(column, fromIndex, toIndex) {
    const arrCopy = [...column];
    let element = arrCopy[fromIndex];
    arrCopy.splice(fromIndex, 1);
    arrCopy.splice(toIndex, 0, element);

    return arrCopy;
  }

  function moveUp(column, index) {
    if (index === 0) return;
    column === leftColumn
      ? setLeftColumn(moveElement(column, index, index - 1))
      : setRightColumn(moveElement(column, index, index - 1));
  }

  function moveDown(column, index) {
    if (index === column.length - 1) return;
    column === leftColumn
      ? setLeftColumn(moveElement(column, index, index + 1))
      : setRightColumn(moveElement(column, index, index + 1));
  }

  function validateAnswers() {
    const correctSet = quizzes[id].questions[currentIndex].correctSet;
    const actualSet = [];
    for (let i = 0; i < correctSet.length; i++) {
      actualSet.push([leftColumn[i].id, rightColumn[i].id]);
    }
    correctSet.sort() === correctSet.sort()
      ? nextQuestionHandler({ answer: '{"isCorrect":true}' })
      : nextQuestionHandler({ answer: '{"isCorrect":false}' });
  }

  return (
    <form onSubmit={handleSubmit(validateAnswers)}>
      <h1>{quizzes[id].questions[currentIndex].query}</h1>
      <Table>
        <caption>Match Elements</caption>
        {leftColumn.map((leftElement, i) => {
          return (
            <tr key={i}>
              <td>
                <MovableComponent
                  key={i}
                  index={i}
                  content={leftElement.content}
                  moveUp={() => moveUp(leftColumn, i)}
                  moveDown={() => moveDown(leftColumn, i)}
                />
              </td>
              <td>
                <MovableComponent
                  key={i + 4}
                  index={i}
                  content={rightColumn[i].content}
                  moveUp={() => moveUp(rightColumn, i)}
                  moveDown={() => moveDown(rightColumn, i)}
                />
              </td>
            </tr>
          );
        })}
        <button ref={submitRef} type="submit" style={{ display: "none" }} />
      </Table>
    </form>
  );
}

export default SortQuestion;
