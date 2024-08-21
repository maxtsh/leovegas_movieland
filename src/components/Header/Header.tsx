import { Link, NavLink, useSearchParams } from "react-router-dom";
import { FaFilm, FaRegStar, FaStar } from "react-icons/fa6";
import debounce from "@/utils/debounce";
import Input from "@/components/base/Input";
import { getMoviesList } from "@/data/moviesSlice";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import useTypedSelector from "@/hooks/useTypedSelector";
import "./Header.styles.scss";
import { useRef } from "react";

function Header() {
  const dispatch = useTypedDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const starred = useTypedSelector((state) => state.starred);
  const searchQuery = searchParams.get("search");
  const starredItemsCount = starred.data.length;

  const searchMovies = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    dispatch(getMoviesList(query)).catch(() => {});

    searchParams.delete("search");
    if (query) searchParams.append("search", query);
    setSearchParams(searchParams);
  }, 300);

  const handleGoHome = (currentSearchQuery: string | null) => {
    if (currentSearchQuery) dispatch(getMoviesList()).catch(() => {});
    if (inputRef.current) inputRef.current.value = "";
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <header>
      <div className="header__info">
        <Link
          to="/"
          data-testid="home"
          onClick={() => handleGoHome(searchQuery)}>
          <FaFilm size={25} className="i" />
        </Link>
      </div>
      <div className="header__actions">
        <div className="input-group rounded">
          <Input
            type="search"
            ref={inputRef}
            data-testid="search-movies"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
            className="form-control rounded"
            defaultValue={searchQuery || ""}
            onChange={searchMovies}
          />
        </div>
        <nav>
          <NavLink
            to="/starred"
            data-testid="nav-starred"
            className="nav-starred">
            {starredItemsCount > 0 ? (
              <div className="starred_wrapper">
                <FaStar size={25} className="i flash" />
                <sup className="star-number">{starredItemsCount}</sup>
              </div>
            ) : (
              <FaRegStar size={25} className="i" />
            )}
          </NavLink>
          <NavLink to="/watch-later" className="nav-fav">
            Watch Later
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
