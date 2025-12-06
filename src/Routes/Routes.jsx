import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/join-employee",
        element: <div>Join Employee Page</div>,
      },
      {
        path: "/join-hr",
        element: <div>Join HR Page</div>,
      },
      {
        path: "/login",
        element: <div>Login Page</div>,
      },
    ],
  },
]);

export default router;
