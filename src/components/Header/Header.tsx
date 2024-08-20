import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getMoviesList } from "@/data/moviesSlice";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import useTypedSelector from "@/hooks/useTypedSelector";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [_, setSearchParams] = useSearchParams();
  const { data } = useTypedSelector((state) => state.starred);

  const getSearchResults = (query?: string) => {
    if (query !== "") {
      dispatch(getMoviesList(query)).catch(() => {});
      setSearchParams(createSearchParams({ search: query || "" }));
    } else {
      dispatch(getMoviesList()).catch(() => {});
      setSearchParams();
    }
  };

  const searchMovies = (query: string) => {
    navigate("/");
    getSearchResults(query);
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred">
          {data.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{data.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={(e) => searchMovies("")} className="search-link">
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={(e) => searchMovies(e.target.value)}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
