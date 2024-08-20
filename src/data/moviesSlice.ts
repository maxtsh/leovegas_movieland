import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestHandler from "@/services/requestHandler";
import { searchMovieAPIPath, discoverAPIPath } from "@/services/constants";
import type { APIStatuses, MovieListResult } from "@/types";

type MoviesState = {
  status: APIStatuses;
  error: string | null;
  data: MovieListResult | null;
};

export const getMoviesList = createAsyncThunk(
  "moviesList",
  (query?: string) => {
    const url = query
      ? searchMovieAPIPath(query)
      : discoverAPIPath("vote_count.desc");

    return requestHandler<MovieListResult>(url);
  },
);

const initialState: MoviesState = {
  data: null,
  error: null,
  status: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearData(state) {
      state.data = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getMoviesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMoviesList.rejected, (state, action) => {
        state.status = "error";
        state.error = action?.error?.message || null;
      });
  },
});

export const moviesActions = moviesSlice.actions;

export default moviesSlice;
