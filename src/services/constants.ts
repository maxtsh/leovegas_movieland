export const searchMovieAPIPath = (query: string) =>
  `search/movie?query=${query}`;
export const discoverAPIPath = (page: number, sortBy: string) =>
  `discover/movie?page=${page}&sort_by=${sortBy}`;
export const movieAPIPath = (id: number) =>
  `movie/${id}?append_to_response=videos`;
