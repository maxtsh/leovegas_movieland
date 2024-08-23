import watchLaterSlice from "./watchLaterSlice";
import { moviesMock, movie1, movie2 } from "./movies.mocks";

test("Watchlater slice should return the initial state", () => {
  const initialState = watchLaterSlice.reducer(undefined, { type: "unknown" });

  expect(initialState).toEqual({ data: [] });
});

test("Watchlater slice should handle addToWatchLater", () => {
  const newMovie = movie1;

  const { addToWatchLater } = watchLaterSlice.actions;

  const nextState = watchLaterSlice.reducer(
    { data: [] },
    addToWatchLater(newMovie),
  );

  expect(nextState.data).toHaveLength(1);
  expect(nextState.data[0]).toEqual(newMovie);
});

test("Watchlater slice should handle removeFromWatchLater", () => {
  const { removeFromWatchLater } = watchLaterSlice.actions;

  const nextState = watchLaterSlice.reducer(
    { data: moviesMock },
    removeFromWatchLater(movie1.id),
  );

  expect(nextState.data).toHaveLength(1);
  expect(nextState.data?.[0]?.id).toBe(movie2.id);
});

test("Watchlater slice should handle clearWatchLater", () => {
  const { clearWatchLater } = watchLaterSlice.actions;

  const nextState = watchLaterSlice.reducer(
    { data: moviesMock },
    clearWatchLater(),
  );

  expect(nextState.data).toHaveLength(0);
});

test("Watchlater slice should add new movie at the beginning of the list", () => {
  const initialState = { data: [movie1] };
  const newMovie = movie2;

  const { addToWatchLater } = watchLaterSlice.actions;
  const nextState = watchLaterSlice.reducer(
    initialState,
    addToWatchLater(newMovie),
  );

  expect(nextState.data).toHaveLength(2);
  expect(nextState.data[0]).toEqual(newMovie);
  expect(nextState.data?.[1]?.id).toBe(movie1.id);
});
