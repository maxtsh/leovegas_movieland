import { useState } from "react";
import { FaRegStar, FaStar, FaCheck } from "react-icons/fa";
import Modal from "@/components/base/Modal";
import Button from "@/components/base/Button";
import Image from "@/components/base/Image/Image";
import starredSlice from "@/data/starredSlice";
import watchLaterSlice from "@/data/watchLaterSlice";
import placeholder from "@/assets/not-found-500X750.jpeg";
import useTypedSelector from "@/hooks/useTypedSelector";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import Movietrailer from "@/components/YoutubeTrailer";
import type { Movie } from "@/types";
import "./Movie.styles.scss";

type Props = {
  movie: Movie;
};

function MovieComponent({ movie }: Props) {
  const dispatch = useTypedDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const year = movie.release_date?.substring(0, 4);
  const { starMovie, unstarMovie } = starredSlice.actions;
  const starred = useTypedSelector((state) => state.starred);

  const watchLater = useTypedSelector((state) => state.watchLater);
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const handleOpenState = () => setIsOpen(true);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleCloseState = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div
        className={`card${isOpen ? " opened" : ""}`}
        onClick={handleOpenState}>
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
              <Button fullWidth variant="secondary" onClick={handleShowModal}>
                View Trailer
              </Button>
            </div>
          </div>
          <Image
            width="100%"
            height="auto"
            Fallback={placeholder}
            alt={`Movie poster for ${movie.title}`}
            loadingStyles={{ width: "100%", height: "22rem" }}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <Button
          variant="ghost"
          className="close"
          aria-label="Close"
          onClick={handleCloseState}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <Modal.Header>
          <h3 className="movie-trailer-title">{movie.title} Trailer</h3>
        </Modal.Header>
        <Modal.Body>
          <Movietrailer movieId={movie.id} />
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" variant="primary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MovieComponent;
