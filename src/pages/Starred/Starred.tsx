import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa6";
import starredSlice from "@/data/starredSlice";
import Button from "@/components/base/Button";
import useTypedSelector from "@/hooks/useTypedSelector";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import MoviesGrid from "@/components/MoviesGrid";
import "./Starred.styles.scss";

function Starred() {
  const dispatch = useTypedDispatch();
  const { clearStarred } = starredSlice.actions;
  const starredMovies = useTypedSelector((state) => state.starred);

  const starredMoviesData = starredMovies.data;
  const starredMoviesCount = starredMoviesData.length;

  const handleClearStarred = () => dispatch(clearStarred());

  return (
    <div className="starred-movies" data-testid="starred">
      {starredMoviesCount > 0 ? (
        <div data-testid="starred-movies" className="starred-movies__list">
          <h6 className="starred-movies__list__title">Starred Movies</h6>
          <MoviesGrid movies={starredMoviesData} />
          <footer className="starred-movies__footer">
            <Button size="lg" variant="danger" onClick={handleClearStarred}>
              Remove all starred
            </Button>
          </footer>
        </div>
      ) : (
        <div className="starred-movies__empty-cart">
          <FaRegStar size={30} className="starred-movies__empty-cart__icon" />
          <p className="starred-movies__empty-cart__description">
            There are no starred movies.
          </p>
          <p className="starred-movies__empty-cart__back">
            Go to{" "}
            <Link className="starred-movies__empty-cart__back__link" to="/">
              Home
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Starred;
