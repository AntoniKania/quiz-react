import "./Table.css";

const Table = (props) => {
  const classes = "table-card " + props.className;

  return (
    <div className={classes} id={props.id} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Table;
