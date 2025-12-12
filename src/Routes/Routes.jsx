import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import JoinEmployee from "../Pages/Register/JoinEmployee";
import JoinHR from "../Pages/Register/JoinHR";
import AssetList from "../Pages/Dashboard/HR/AssetList";
import AddAsset from "../Pages/Dashboard/HR/AddAsset";
import MyAssets from "../Pages/Dashboard/Employee/MyAssets";
import MyTeam from "../Pages/Dashboard/Employee/MyTeam";
import RequestAsset from "../Pages/Dashboard/Employee/RequestAsset";
import Profile from "../Pages/Profile/Profile";
import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";
import PrivateRoute from "./PrivateRoute";

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
        element: <JoinHR />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/asset-list",
        element: (
          <AdminRoute>
            <AssetList />
          </AdminRoute>
        ),
      },
      {
        path: "/add-asset",
        element: (
          <AdminRoute>
            <AddAsset />
          </AdminRoute>
        ),
      },
      {
        path: "/my-assets",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "/my-team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "/request-asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
