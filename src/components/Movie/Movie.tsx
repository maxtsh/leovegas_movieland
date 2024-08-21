import { useState } from "react";
import { FaRegStar, FaStar, FaCheck } from "react-icons/fa";
import Button from "@/components/base/Button";
import Image from "@/components/base/Image/Image";
import starredSlice from "@/data/starredSlice";
import watchLaterSlice from "@/data/watchLaterSlice";
import placeholder from "@/assets/not-found-500X750.jpeg";
import useTypedSelector from "@/hooks/useTypedSelector";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import type { Movie } from "@/types";
import "./Movie.styles.scss";

type Props = {
  movie: Movie;
};

function MovieComponent({ movie }: Props) {
  const dispatch = useTypedDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const year = movie.release_date?.substring(0, 4);
  const { starMovie, unstarMovie } = starredSlice.actions;
  const starred = useTypedSelector((state) => state.starred);
  const watchLater = useTypedSelector((state) => state.watchLater);
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const handleOpen = () => setIsOpen(true);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleStarMovie = (
    e: React.MouseEvent<HTMLButtonElement>,
    movieItem: Movie,
  ) => {
    e.stopPropagation();
    dispatch(starMovie(movieItem));
  };

  const handleRemoveFromStarred = (
    e: React.MouseEvent<HTMLButtonElement>,
    movieId: number,
  ) => {
    e.stopPropagation();
    dispatch(unstarMovie(movieId));
  };

  const handleAddToWatchLater = (
    e: React.MouseEvent<HTMLButtonElement>,
    movieItem: Movie,
  ) => {
    e.stopPropagation();
    dispatch(addToWatchLater(movieItem));
  };

  const handleRemoveFromWatchLater = (
    e: React.MouseEvent<HTMLButtonElement>,
    movieId: number,
  ) => {
    e.stopPropagation();
    dispatch(removeFromWatchLater(movieId));
  };

  return (
    <div className="wrapper">
      <div className={`card${isOpen ? " opened" : ""}`} onClick={handleOpen}>
        <div className="card-body">
          <div className="overlay" />
          <div className="info_panel">
            <div className="info_panel__overview">{movie.overview}</div>
            <div className="year">{year}</div>
            <div className="info_panel__actions">
              {!starred.data.map((item) => item.id).includes(movie.id) ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => handleStarMovie(e, movie)}>
                  <span className="btn-star" data-testid="starred-link">
                    <FaRegStar size={30} />
                  </span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => handleRemoveFromStarred(e, movie.id)}>
                  <span className="btn-star" data-testid="unstar-link">
                    <FaStar size={30} />
                  </span>
                </Button>
              )}
              {!watchLater.data.map((item) => item.id).includes(movie.id) ? (
                <Button
                  fullWidth
                  variant="secondary"
                  data-testid="watch-later"
                  onClick={(e) => handleAddToWatchLater(e, movie)}>
                  Watch Later
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="primary"
                  data-testid="remove-watch-later"
                  onClick={(e) => handleRemoveFromWatchLater(e, movie.id)}>
                  In Watch List
                  <FaCheck size={18} className="bi bi-check" />
                </Button>
              )}
              <Button
                fullWidth
                variant="secondary"
                className="btn btn-dark"
                onClick={() => {}}>
                View Trailer
              </Button>
            </div>
          </div>
          <Image
            width="100%"
            height="25rem"
            Fallback={placeholder}
            alt={`Movie poster for ${movie.title}`}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <Button
          variant="ghost"
          className="close"
          aria-label="Close"
          onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
    </div>
  );
}

export default MovieComponent;
