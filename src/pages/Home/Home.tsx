import { useEffect, useRef } from "react";
import MoviesGrid from "@/components/MoviesGrid";
import { getMoviesList, moviesActions } from "@/data/moviesSlice";
import { useSearchParams } from "react-router-dom";
// import { getMovieById } from "@/services";
import useTypedSelector from "@/hooks/useTypedSelector";
import useTypedDispatch from "@/hooks/useTypedDispatch";
// import YouTubePlayer from "@/components/YoutubePlayer";

function Home() {
  const mountRef = useRef(false);
  const dispatch = useTypedDispatch();
  const [searchParams] = useSearchParams();
  const moviesList = useTypedSelector((state) => state.movies);
  const moviesData = moviesList?.data?.results || [];
  const searchQuery = searchParams.get("search") ?? undefined;

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      dispatch(getMoviesList(searchQuery)).catch(() => {});
    }

    return () => {
      moviesActions.clearData();
    };
  }, [searchQuery, dispatch]);

  return <MoviesGrid movies={moviesData} />;
}

export default Home;
