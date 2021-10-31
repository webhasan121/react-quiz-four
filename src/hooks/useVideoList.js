import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setvideos] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");

      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(7)
      );

      try {
        setError(false);
        setLoading(true);
        //request firebaseDatabase
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setvideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
          //
          sethasMore(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
