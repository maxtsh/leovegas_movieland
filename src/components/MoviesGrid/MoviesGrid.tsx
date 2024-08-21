import MovieComponent from "@/components/Movie";
import type { Movie } from "@/types";
import "./MoviesGrid.styles.scss";

type Props = {
  movies: Array<Movie>;
};

function MoviesGrid({ movies }: Props) {
  return (
    <div className="container">
      {movies?.map((movie) => {
        return <MovieComponent movie={movie} key={movie.id} />;
      })}
    </div>
  );
}

export default MoviesGrid;
