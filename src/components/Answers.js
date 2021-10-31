import { Fragment } from "react";
import CheckBox from "../components/CheckBox";
import classes from "../styles/Answers.module.css";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <CheckBox
              className={classes.answer}
              text={option.title}
              value={index}
              key={index}
              checked={option.checked}
              onChange={(e) => handleChange(e, index)}
            />
          ) : (
            <CheckBox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
