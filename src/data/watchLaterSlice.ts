import { Movie } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WatchLaterState = {
  data: Array<Movie>;
};

const initialState: WatchLaterState = {
  data: [],
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<Movie>) => {
      state.data = [action.payload, ...state.data];
    },
    removeFromWatchLater: (state, action: PayloadAction<string>) => {
      const indexOfId = state.data.findIndex(
        (key) => key.id === action.payload,
      );
      state.data = state.data.toSpliced(indexOfId, 1);
    },
    clearWatchLater: (state) => {
      state.data = [];
    },
  },
});

export default watchLaterSlice;
