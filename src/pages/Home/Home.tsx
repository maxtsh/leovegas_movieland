import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesGrid from "@/components/MoviesGrid";
import useTypedSelector from "@/hooks/useTypedSelector";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import { getMoviesList, moviesActions } from "@/data/moviesSlice";
import "./Home.styles.scss";
import InfiniteMoviesScroll from "@/components/InfiniteMoviesScroll";

function Home() {
  const mountRef = useRef(false);
  const dispatch = useTypedDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const moviesList = useTypedSelector((state) => state.movies);
  const moviesData = moviesList?.data?.results || [];

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      dispatch(getMoviesList({ query: searchQuery ?? undefined })).catch(
        () => {},
      );
    }

    return () => {
      moviesActions.clearData();
    };
  }, [searchQuery, dispatch]);

  return (
    <div className="home-page">
      {moviesList.status === "loading" && (
        <div role="progressbar" className="loading">
          <h5 className="loading__title">Searching, be patient..!</h5>
        </div>
      )}
      {moviesList.status === "success" && (
        <>
          <MoviesGrid movies={moviesData} />
          <InfiniteMoviesScroll initialPage={1} />
        </>
      )}
      {moviesList.status === "error" && (
        <div className="error">
          <h5 className="error__title">Error: {moviesList.error}</h5>
        </div>
      )}
    </div>
  );
}

export default Home;
