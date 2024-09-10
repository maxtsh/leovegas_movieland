import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

type StarredState = {
  data: Array<Movie>;
};

const initialState: StarredState = {
  data: [],
};

const starredSlice = createSlice({
  name: "starred",
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<Movie>) => {
      state.data = [action.payload, ...state.data];
    },
    unstarMovie: (state, action: PayloadAction<string>) => {
      const indexOfId = state.data.findIndex(
        (key) => key.id === action.payload,
      );
      state.data = state.data.toSpliced(indexOfId, 1);
    },
    clearStarred: (state) => {
      state.data = [];
    },
  },
});

export default starredSlice;
