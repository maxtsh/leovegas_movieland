import { useRef } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { FaFilm, FaRegStar, FaStar } from "react-icons/fa6";
import { getMoviesList } from "@/data/moviesSlice";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import useTypedSelector from "@/hooks/useTypedSelector";
import HeaderSearch from "./HeaderSearch";
import "./Header.styles.scss";

function Header() {
  const dispatch = useTypedDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const starred = useTypedSelector((state) => state.starred);
  const searchQuery = searchParams.get("search");
  const starredItemsCount = starred.data.length;

  const handleGoHome = (currentSearchQuery: string | null) => {
    if (currentSearchQuery) dispatch(getMoviesList({})).catch(() => {});
    if (inputRef.current) inputRef.current.value = "";
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <header>
      <div className="header__info">
        <Link
          to="/"
          aria-label="home page"
          onClick={() => handleGoHome(searchQuery)}>
          <FaFilm size={25} className="i" />
        </Link>
      </div>
      <div className="header__actions">
        <HeaderSearch inputRef={inputRef} />
        <nav>
          <NavLink
            to="/starred"
            aria-label="nav-starred"
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
          <NavLink
            to="/watch-later"
            aria-label="nav-watch-later"
            className="nav-fav">
            Watch Later
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
