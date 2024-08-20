import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState: {
    data: [],
  },
  reducers: {
    addToWatchLater: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.data.findIndex(
        (key) => key.id === action.payload.id,
      );
      state.data.splice(indexOfId, 1);
    },
    remveAllWatchLater: (state) => {
      state.data = [];
    },
  },
});

export default watchLaterSlice;
