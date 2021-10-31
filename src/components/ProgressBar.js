import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, progress, submit }) {
  const tootltipRef = useRef();
  const [tootltip, settootltip] = useState(false);
  function toogleToolTop() {
    if (tootltip) {
      settootltip(false);
      tootltipRef.current.style.display = "none";
    } else {
      settootltip(true);
      tootltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tootltipRef.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tootltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toogleToolTop}
            onMouseOut={toogleToolTop}
          ></div>
        </div>
      </div>

      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
