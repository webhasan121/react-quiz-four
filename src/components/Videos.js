import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video.js";

export default function Videos() {
  const [page, setPagae] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPagae(page + 7)}
          loader={"Loading........."}
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link
                to={{
                  pathname: `/quiz/${video.youtubeID}`,
                  state: {
                    videoTitle: video.title,
                  },
                }}
                key={video.youtubeID}
              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
                key={video.youtubeID}
              />
            )
          )}
        </InfiniteScroll>
      )}

      {!loading && videos.length === 0 && <div>no data found</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </>
  );
}
