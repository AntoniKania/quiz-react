import Popup from "../UI/Popup";
import { useForm } from "react-hook-form";

function LoginPopup(props) {
  const { register, handleSubmit } = useForm();
  if (!props.triggered) {
    return null;
  }
  return (
    <Popup triggered={true}>
      <h1>Welcome!</h1>
      <h2>To continue, please enter your name</h2>
      <form onSubmit={handleSubmit(props.onLogin)}>
        <label htmlFor="name">Insert your name:</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
        />
        <button>Login</button>
      </form>
    </Popup>
  );
}

export default LoginPopup;
