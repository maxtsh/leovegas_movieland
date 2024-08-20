import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
  name: "starred",
  initialState: {
    data: [],
  },
  reducers: {
    starMovie: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.data.findIndex(
        (key) => key.id === action.payload.id,
      );
      state.data.splice(indexOfId, 1);
    },
    clearAllStarred: (state) => {
      state.data = [];
    },
  },
});

export default starredSlice;
