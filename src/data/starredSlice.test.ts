import starredSlice from "./starredSlice";
import { moviesMock, movie1, movie2 } from "./movies.mocks";

test("Starred slice should return the initial state", () => {
  const initialState = starredSlice.reducer(undefined, { type: "unknown" });

  expect(initialState).toEqual({ data: [] });
});

test("Starred slice should handle starMovie", () => {
  const newMovie = movie1;

  const { starMovie } = starredSlice.actions;

  const nextState = starredSlice.reducer({ data: [] }, starMovie(newMovie));

  expect(nextState.data).toHaveLength(1);
  expect(nextState.data[0]).toEqual(newMovie);
});

test("Starred slice should handle unstarMovie", () => {
  const { unstarMovie } = starredSlice.actions;

  const nextState = starredSlice.reducer(
    { data: moviesMock },
    unstarMovie(movie1.id),
  );

  expect(nextState.data).toHaveLength(1);
  expect(nextState.data?.[0]?.id).toBe(movie2.id);
});

test("Starred slice should handle clearStarred", () => {
  const { clearStarred } = starredSlice.actions;

  const nextState = starredSlice.reducer({ data: moviesMock }, clearStarred());

  expect(nextState.data).toHaveLength(0);
});

test("Starred slice should add new movie at the beginning of the list", () => {
  const initialState = { data: [movie1] };
  const newMovie = movie2;

  const { starMovie } = starredSlice.actions;
  const nextState = starredSlice.reducer(initialState, starMovie(newMovie));

  expect(nextState.data).toHaveLength(2);
  expect(nextState.data[0]).toEqual(newMovie);
  expect(nextState.data?.[1]?.id).toBe(movie1.id);
});
