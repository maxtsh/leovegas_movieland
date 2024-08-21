import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovies } from "@/services";
import type { APIStatuses, MovieListResult, MovieParams } from "@/types";

type MoviesState = {
  status: APIStatuses;
  error: string | null;
  data: MovieListResult | null;
};

export const getMoviesList = createAsyncThunk(
  "moviesList",
  (params: MovieParams) => {
    return getMovies(params);
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
