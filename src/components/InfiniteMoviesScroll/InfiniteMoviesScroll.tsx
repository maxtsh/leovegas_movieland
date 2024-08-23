import { useRef, useState, useCallback, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { getMovies } from "@/services";
import moviesSlice from "@/data/moviesSlice";
import useTypedDispatch from "@/hooks/useTypedDispatch";
import type { APIStatuses } from "@/types";
import "./InfiniteMoviesScroll.styles.scss";

type Props = {
  initialPage: number;
};

type InfiniteScrollData = {
  error: null | string;
  status: APIStatuses;
};

let timeoutId: ReturnType<typeof setTimeout> | null = null;

function InfiniteMoviesScroll({ initialPage = 1 }: Props) {
  const page = useRef<number>(initialPage);
  const dispatch = useTypedDispatch();
  const { appendMovies } = moviesSlice.actions;
  const { ref, observerStatus } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
  });
  const [state, setState] = useState<InfiniteScrollData>({
    error: null,
    status: "idle",
  });

  const handleFetch = useCallback(async () => {
    setState((prevData) => ({ ...prevData, status: "loading" }));

    try {
      const newPage = page.current + 1;

      const list = await getMovies({ page: newPage });

      if (timeoutId) clearTimeout(timeoutId);

      // Add a slight delay to make sure we don't get multiple requests
      timeoutId = setTimeout(() => {
        setState({
          error: null,
          status: "success",
        });

        dispatch(appendMovies(list.results));
      }, 50);

      page.current = newPage;
    } catch (err) {
      setState((prevData) => ({
        ...prevData,
        status: "error",
        error: err instanceof Error ? err.message : "Something went wrong",
      }));
    }
  }, [dispatch, appendMovies]);

  useEffect(() => {
    if (observerStatus?.isIntersecting && state.status !== "loading") {
      handleFetch().catch(() => {});
    }
  }, [observerStatus?.isIntersecting, state.status, handleFetch]);

  const triggerClasses =
    `infinite-scroll__trigger ${state.status === "loading" ? "hide" : ""}`.trim();

  return (
    <div className="infinite-scroll" data-testid="infinite-scroll">
      {state.status === "error" && (
        <div className="infinite-scroll__error">
          <h5 className="infinite-scroll__error__title">{state.error}</h5>
        </div>
      )}
      {state.status === "loading" && (
        <div role="progressbar" className="infinite-scroll__loading">
          <h5 className="infinite-scroll__loading__title">
            Searching, be patient..!
          </h5>
        </div>
      )}
      <div
        ref={ref}
        className={triggerClasses}
        data-testid="infinite-scroll-trigger"></div>
    </div>
  );
}

export default InfiniteMoviesScroll;
