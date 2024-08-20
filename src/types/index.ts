export type APIStatuses = "idle" | "error" | "success" | "loading";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export type MovieListResult = {
  page: number;
  total_pages: number;
  results: Array<Movie>;
  total_results: number;
};
