import "./StaticCard.css";

const Card = (props) => {
  const classes = "static-card " + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default Card;
