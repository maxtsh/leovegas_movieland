export const searchMovieAPIPath = (query: string) =>
  `search/movie?query=${query}`;
export const discoverAPIPath = (sortBy: string) =>
  `discover/movie?sort_by=${sortBy}`;
export const movieAPIPath = (id: string) =>
  `movie/${id}?append_to_response=videos`;
