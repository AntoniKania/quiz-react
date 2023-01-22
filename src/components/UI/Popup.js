import "./Popup.css";

function Popup(props) {
  if (!props.triggered) {
    return null;
  }
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}

export default Popup;
