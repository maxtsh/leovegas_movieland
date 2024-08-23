export const searchMovieAPIPath = (query: string) =>
  `search/movie?query=${query}`;
export const discoverAPIPath = (page: number, sortBy: string) =>
  `discover/movie?page=${page}&sort_by=${sortBy}`;
export const movieAPIPath = (id: string) =>
  `movie/${id}?append_to_response=videos`;
export const getMoviePoster = (path: string, size: string = "w500") =>
  `https://image.tmdb.org/t/p/${size}/${path}`;
