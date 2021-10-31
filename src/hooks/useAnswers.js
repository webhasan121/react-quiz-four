import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");

      const answersQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebaseDatabase
        const snapshot = await get(answersQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
