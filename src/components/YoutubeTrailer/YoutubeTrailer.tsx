import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { getMovieById } from "@/services";

type Props = {
  movieId: string;
};

function YoutubeTrailer({ movieId }: Props) {
  const isMounted = useRef(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      getMovieById(movieId)
        .then((res) => {
          if (res?.videos?.results?.length > 0) {
            const trailer = res.videos.results.find(
              (vid) => vid.type === "Trailer",
            );
            setVideoKey(trailer?.key ?? res?.videos?.results?.[0]?.key ?? "");
          }
        })
        .catch(() => {
          // Maybe show toast or set errpr for failed to load the video!
        });
    }
  }, [movieId]);

  return (
    <ReactPlayer
      width="100%"
      height="100%"
      playing={true}
      controls={true}
      data-testid="video-player"
      className="video-player"
      url={`https://www.youtube.com/watch?v=${videoKey}`}
    />
  );
}

export default YoutubeTrailer;
