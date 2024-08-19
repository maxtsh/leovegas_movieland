import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "../constants";

export const getMovie = async (id) => {
  const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

  setVideoKey(null);
  const videoData = await fetch(URL).then((response) => response.json());

  if (videoData.videos && videoData.videos.results.length) {
    const trailer = videoData.videos.results.find(
      (vid) => vid.type === "Trailer",
    );
    setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
  }
};
