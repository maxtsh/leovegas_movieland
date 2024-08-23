import { discoverAPIPath, movieAPIPath, searchMovieAPIPath } from "./constants";
import requestHandler from "./requestHandler";
import type { MovieParams, MovieDetails, MovieListResult } from "@/types";

export const getMovieById = async (id: string) => {
  const url = movieAPIPath(id);

  return requestHandler<MovieDetails>(url);
};

export const getMovies = async ({ query, page }: MovieParams) => {
  const url = query
    ? searchMovieAPIPath(query)
    : discoverAPIPath(page || 1, "vote_count.desc");

  return requestHandler<MovieListResult>(url);
};
