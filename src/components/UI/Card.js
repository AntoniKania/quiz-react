import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className;

  return (
    <div className={classes} id={props.id} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
