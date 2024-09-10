import type { Movie } from "@/types";

export const movie1: Movie = {
  id: "27205",
  adult: false,
  backdrop_path: "/back-drop-1",
  genre_ids: [1],
  original_language: "English",
  original_title: "Inception",
  popularity: 8,
  poster_path: "/poster-1",
  video: true,
  vote_average: 7,
  vote_count: 9,
  overview: "overview-1",
  release_date: "2010-07-15",
  title: "Inception",
};

export const movie2: Movie = {
  id: "157336",
  overview: "overview-2",
  release_date: "2014-11-05",
  title: "Interstellar",
  adult: false,
  backdrop_path: "/back-drop-2",
  genre_ids: [],
  original_language: "English",
  original_title: "Interstellar",
  popularity: 7,
  poster_path: "/poster-2",
  video: true,
  vote_average: 5,
  vote_count: 6,
};

export const moviesMock: Array<Movie> = [movie1, movie2];
