import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import MovieTheaterSeatsBooking from "./pages/MovieTheaterSeatsBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "/seatsbookingportal", element: <MovieTheaterSeatsBooking /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
