import { useState, useEffect, useRef } from "react";
import "./Timer.css";

function Timer({ outOfTime, time, currentIndex }) {
  const [timer, setTimer] = useState(10);
  const progressBar = useRef(null);

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
    progressBar.current.classList.add("active");
    const interval = setInterval(() => {
      setTimer((prevVal) => prevVal - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    progressBar.current.classList.add("active");

    setTimer(time);
  }, [currentIndex, outOfTime]);

  return (
    <>
      <div
        className="progress-bar"
        ref={progressBar}
        style={{ "--time": time + "s" }}
      ></div>
      <div className="timer">
        <span>{formatTime(timer)}</span>
      </div>
    </>
  );
}

export default Timer;
