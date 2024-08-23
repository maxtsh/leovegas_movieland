import moviesSlice, { getMoviesList } from "./moviesSlice";
import { movie1, movie2, moviesMock } from "./movies.mocks";

test("Movies slice should return the initial state", () => {
  const initialState = moviesSlice.reducer(undefined, { type: "unknown" });

  expect(initialState).toEqual({
    data: null,
    error: null,
    status: "idle",
  });
});

test("Movies slice should handle getMoviesList.pending", () => {
  const initialState = {
    data: null,
    error: null,
    status: "idle",
  } as const;

  const nextState = moviesSlice.reducer(
    initialState,
    getMoviesList.pending("moviesList", { page: 1, query: "" }),
  );

  expect(nextState.status).toBe("loading");
  expect(nextState.data).toBeNull();
  expect(nextState.error).toBeNull();
});

test("Movies slice should handle getMoviesList.fulfilled", () => {
  const mockMovieData = {
    page: 1,
    total_pages: 1,
    total_results: 2,
    results: moviesMock,
  };

  const nextState = moviesSlice.reducer(
    {
      data: null,
      error: null,
      status: "idle",
    },
    {
      type: getMoviesList.fulfilled.type,
      payload: mockMovieData,
    },
  );

  expect(nextState.status).toBe("success");
  expect(nextState.data).toEqual(mockMovieData);
  expect(nextState.error).toBeNull();
});

test("Movies slice should handle getMoviesList.rejected", () => {
  const mockError = new Error("Failed to fetch movies");

  const nextState = moviesSlice.reducer(
    {
      data: null,
      error: null,
      status: "idle",
    },
    {
      type: getMoviesList.rejected.type,
      error: { message: mockError.message },
    },
  );

  expect(nextState.status).toBe("error");
  expect(nextState.error).toBe(mockError.message);
  expect(nextState.data).toBeNull();
});

test("Movies slice should handle clearData", () => {
  const { clearData } = moviesSlice.actions;

  const nextState = moviesSlice.reducer(
    {
      data: {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: moviesMock,
      },
      error: "Some error",
      status: "error",
    },
    clearData(),
  );

  expect(nextState).toEqual({
    data: null,
    error: null,
    status: "idle",
  });
});

test("Movies slice should handle appendMovies", () => {
  const { appendMovies } = moviesSlice.actions;

  const nextState = moviesSlice.reducer(
    {
      data: {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [movie1],
      },
      error: "Some error",
      status: "error",
    },
    appendMovies([movie2]),
  );

  expect(nextState.data?.results).toHaveLength(2);
  expect(nextState.data?.results?.[1]?.id).toBe(movie2.id);
});
