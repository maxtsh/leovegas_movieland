import { useEffect, useRef } from "react";
import Movies from "@/components/Movies";
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
  const { data, status, error } = useTypedSelector((state) => state.movies);
  const moviesData = data?.results || [];
  const searchQuery = searchParams.get("search") ?? undefined;

  console.log(data, status, error);

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      dispatch(getMoviesList(searchQuery)).catch(() => {});
    }

    return () => {
      moviesActions.clearData();
    };
  }, [searchQuery, dispatch]);

  //   const closeCard = () => {};

  //   const viewTrailer = async (movie: { id: string }) => {
  //     await getMovieById(movie.id);
  //     if (!videoKey) setOpen(true);
  //   };

  return <Movies movies={moviesData} />;
}

export default Home;
