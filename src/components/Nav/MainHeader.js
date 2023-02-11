import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../store/UserContext";
import styles from "./MainHeader.module.css";

function MainHeader({ isLoggedIn, setIsLoggedIn }) {
  const { user } = useContext(UserContext);
  return (
    <>
      <nav>
        <ul>
          <li>
            <div className="logo">Quizzzes</div>
          </li>
          <li>
            <NavLink
              id="quizzes-link"
              className={({ isActive }) =>
                isActive ? `${styles["active-link"]}` : `${styles.link}`
              }
              to="/quizzes"
            >
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink
              id="create-quiz-link"
              className={({ isActive }) =>
                isActive ? `${styles["active-link"]}` : `${styles.link}`
              }
              to="/create-quiz"
            >
              Create Quiz
            </NavLink>
          </li>
          <li>{isLoggedIn && <p>Hello, {user}</p>}</li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("name");
                setIsLoggedIn(false);
              }}
            >
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainHeader;
