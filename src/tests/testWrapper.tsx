import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../data/moviesSlice";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import { RootState } from "@/data/store";

type Config = {
  preloadedState?: RootState;
  store?: ReturnType<typeof configureStore>;
  [key: string]: unknown;
};

export function renderWithProviders(
  ui: React.ReactNode,
  {
    preloadedState = {} as RootState,
    store = configureStore({
      reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: Config = {},
) {
  function Wrapper({ children }: React.PropsWithChildren) {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
