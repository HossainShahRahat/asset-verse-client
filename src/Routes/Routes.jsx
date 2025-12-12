import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import JoinEmployee from "../Pages/Register/JoinEmployee";
import JoinHR from "../Pages/Register/JoinHR";
import HRDashboard from "../Pages/Dashboard/HR/HRDashboard";
import AddAsset from "../Pages/Dashboard/HR/AddAsset";
import AllRequests from "../Pages/Dashboard/HR/AllRequests";
import MyEmployeeList from "../Pages/Dashboard/HR/MyEmployeeList";
import MyAssets from "../Pages/Dashboard/Employee/MyAssets";
import MyTeam from "../Pages/Dashboard/Employee/MyTeam";
import RequestAsset from "../Pages/Dashboard/Employee/RequestAsset";
import Profile from "../Pages/Profile/Profile";
import Subscription from "../Pages/Subscription/Subscription";
import Payment from "../Pages/Payment/Payment";
import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: "/join-employee",
        element: (
          <PublicRoute>
            <JoinEmployee />
          </PublicRoute>
        ),
      },
      {
        path: "/join-hr",
        element: (
          <PublicRoute>
            <JoinHR />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <AdminRoute>
            <HRDashboard />
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
        path: "/all-requests",
        element: (
          <AdminRoute>
            <AllRequests />
          </AdminRoute>
        ),
      },
      {
        path: "/employee-list",
        element: (
          <AdminRoute>
            <MyEmployeeList />
          </AdminRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <AdminRoute>
            <Subscription />
          </AdminRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <AdminRoute>
            <Payment />
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
