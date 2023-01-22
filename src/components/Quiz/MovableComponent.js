import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import "./MovableComponent.css";

function MovableComponent(props) {
  return (
    <div className="component">
      <div className="content">{props.content}</div>
      <div className="component-control">
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
