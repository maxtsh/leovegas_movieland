import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Input from "@/components/base/Input";
import debounce from "@/utils/debounce";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import { getMoviesList } from "@/data/moviesSlice";
import { RefObject } from "react";

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

function HeaderSearch({ inputRef }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const searchMovies = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    dispatch(getMoviesList({ query })).catch(() => {});

    searchParams.delete("search");
    if (query) searchParams.append("search", query);

    if (pathname !== "/") navigate("/");

    setSearchParams(searchParams);
  }, 300);

  return (
    <div className="input-group rounded">
      <Input
        type="search"
        ref={inputRef}
        placeholder="Search movies..."
        aria-label="Search movies"
        aria-describedby="search-addon"
        className="form-control rounded"
        defaultValue={searchQuery || ""}
        onChange={searchMovies}
      />
    </div>
  );
}

export default HeaderSearch;
