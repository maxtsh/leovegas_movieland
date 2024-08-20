import { movieAPIPath } from "./constants";
import requestHanlder from "./requestHandler";

export const getMovieById = async (id: string) => {
  const url = movieAPIPath(id);

  try {
    const data = await requestHanlder(url);
    return data;
  } catch (err) {
    return err;
  }
};
