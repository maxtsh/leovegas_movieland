import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import Button from "@/components/base/Button";
import MoviesGrid from "@/components/MoviesGrid";
import watchLaterSlice from "@/data/watchLaterSlice";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import useTypedSelector from "@/hooks/useTypedSelector";
import "./Watchlater.styles.scss";

function Watchlater() {
  const dispatch = useTypedDispatch();
  const { clearWatchLater } = watchLaterSlice.actions;
  const watchLaterMovies = useTypedSelector((state) => state.watchLater);

  const watchLaterMoviesData = watchLaterMovies.data;
  const watchlaterMoviesCount = watchLaterMoviesData.length;

  const handleClearWatchLater = () => dispatch(clearWatchLater());

  return (
    <div className="watchlater-movies" data-testid="watch-later-div">
      {watchlaterMoviesCount > 0 ? (
        <div
          data-testid="watch-later-movies"
          className="watchlater-movies__list">
          <h6 className="watchlater-movies__list__title">Watch Later List</h6>
          <MoviesGrid movies={watchLaterMoviesData} />
          <footer className="watchlater-movies__footer">
            <Button size="lg" variant="danger" onClick={handleClearWatchLater}>
              Empty the list
            </Button>
          </footer>
        </div>
      ) : (
        <div className="watchlater-movies__empty-cart">
          <FaHeart size={30} className="watchlater-movies__empty-cart__icon" />
          <p className="watchlater-movies__empty-cart__description">
            You have no movies saved to watch later.
          </p>
          <p className="watchlater-movies__empty-cart__back">
            Go to{" "}
            <Link className="watchlater-movies__empty-cart__back__link" to="/">
              Home
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Watchlater;
