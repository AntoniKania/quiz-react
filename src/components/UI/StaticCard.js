import styles from "./StaticCard.module.css";

const Card = (props) => {
  const classes = `${styles["static-card"]} + ${props.className}`;

  return <div className={classes}>{props.children}</div>;
};

export default Card;
