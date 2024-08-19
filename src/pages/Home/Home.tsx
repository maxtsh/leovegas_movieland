import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movies from "@/components/Movies";
import { fetchMovies } from "@/data/moviesSlice";
import { useSearchParams } from "react-router-dom";
import YouTubePlayer from "@/components/YoutubePlayer";
import { getMovie } from "@/services";
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "@/constants";

function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { movies } = useSelector((state) => state);

  const getMovies = () => {
    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const closeCard = () => {};

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
  };

  return (
    <Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />
  );
}

export default Home;
