import styles from "./StaticCard.module.css";

const StaticCard = (props) => {
  const classes = `${styles["static-card"]} + ${props.className}`;

  return (
    <div className={classes} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default StaticCard;
