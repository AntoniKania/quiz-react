import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import styles from "./MovableComponent.module.css";

function MovableComponent(props) {
  return (
    <div className={styles.component}>
      <div className={styles.content}>{props.content}</div>
      <div className={styles["component-control"]}>
        <button type="button" onClick={() => props.moveUp(props.index)}>
          <SlArrowUp />
        </button>
        <button type="button" onClick={() => props.moveDown(props.index)}>
          <SlArrowDown />
        </button>
      </div>
    </div>
  );
}

export default MovableComponent;
