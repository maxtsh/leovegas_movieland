import {
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "@/layout";
import Providers from "@/Providers";
import Home from "@/pages/Home";
import Starred from "@/pages/Starred";
import Watchlater from "@/pages/Watchlater";
import "@/styles/global.styles.scss";

const router = createBrowserRouter(
  [
    {
      path: "",
      element: (
        <Providers>
          <Layout />
          <ScrollRestoration />
        </Providers>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/starred",
          element: <Starred />,
        },
        {
          path: "/watch-later",
          element: <Watchlater />,
        },
        {
          path: "*",
          element: <h1 className="not-found">Page Not Found</h1>,
        },
      ],
    },
  ],
  { basename: "/" },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
