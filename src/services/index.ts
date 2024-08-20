import requestHanlder from "./requestHandler";

export const getMovieById = async (id: string) => {
  try {
    const data = await requestHanlder(`movie/${id}?append_to_response=videos`);
    return data;
  } catch (err) {
    return err;
  }
};
