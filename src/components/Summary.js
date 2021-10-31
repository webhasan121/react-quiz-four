import { useMemo } from "react";
import sImage from "../assets/images/success.png";
import useFeatch from "../hooks/useFeatch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() => {
    console.log(score);
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);
  const { loading, error, result } = useFeatch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    { Authorization: process.env.REACT_APP_PEXELS_API_KEY }
  );
  const apiImage = result ? result?.photos[0].src.medium : sImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Loading your badge...</div>}
      {error && <div className={classes.badge}>An Error Occured</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={apiImage} alt="Success" />
        </div>
      )}
    </div>
  );
}
