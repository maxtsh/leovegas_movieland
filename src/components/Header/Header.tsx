import { Link, NavLink, useSearchParams } from "react-router-dom";
import debounce from "@/utils/debounce";
import { getMoviesList } from "@/data/moviesSlice";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import useTypedSelector from "@/hooks/useTypedSelector";
import "./header.scss";

function Header() {
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useTypedSelector((state) => state.starred);

  const searchQuery = searchParams.get("search");

  const searchMovies = debounce((query: string) => {
    dispatch(getMoviesList(query)).catch(() => {});

    searchParams.delete("search");
    if (query) searchParams.append("search", query);
    setSearchParams(searchParams);
  }, 300);

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
          Watch Later
        </NavLink>
      </nav>
      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
          className="form-control rounded"
          defaultValue={searchQuery || ""}
          onChange={(e) => searchMovies(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;
