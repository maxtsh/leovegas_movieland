import { movieAPIPath } from "./constants";
import requestHanlder from "./requestHandler";
import type { MovieDetails } from "@/types";

export const getMovieById = async (id: number) => {
  const url = movieAPIPath(id);

  return requestHanlder<MovieDetails>(url);
};
