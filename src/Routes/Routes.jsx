import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import JoinEmployee from "../Pages/Register/JoinEmployee";

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
        element: <JoinEmployee />,
      },
      {
        path: "/join-hr",
        element: <div>Join HR Page</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
