import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ outOfTime, time, currentIndex }) {
  const [timer, setTimer] = useState(10);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (timer === 0) return outOfTime(true);
    const interval = setInterval(() => {
      setTimer((prevVal) => prevVal - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setTimer(time);
  }, [currentIndex, outOfTime]);

  return (
    <>
      <div
        className={`${styles["progress-bar"]} ${styles.active}`}
        style={{ "--time": time + "s" }}
      ></div>
      <div className="timer">
        <span>{formatTime(timer)}</span>
      </div>
    </>
  );
}

export default Timer;
