import MovieComponent from "@/components/Movie";
import type { Movie } from "@/types";
import "./movies.scss";

type Props = {
  movies: Array<Movie>;
};

const Movies = ({ movies }: Props) => {
  return (
    <div data-testid="movies">
      {movies?.map((movie) => {
        return <MovieComponent movie={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default Movies;
