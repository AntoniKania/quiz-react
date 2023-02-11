import styles from "./Popup.module.css";

function Popup(props) {
  if (!props.triggered) {
    return null;
  }
  return (
    <div className={styles.popup}>
      <div className={styles["popup-inner"]}>{props.children}</div>
    </div>
  );
}

export default Popup;
