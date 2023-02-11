import styles from "./Table.module.css";

const Table = (props) => {
  const classes = `${styles.card} + ${props.className}`;

  return (
    <div className={classes} id={props.id} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Table;
