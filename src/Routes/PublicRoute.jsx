import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useRole from "../Hooks/useUserStatus";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (user) {
    if (role === "hr") {
      return <Navigate to="/asset-list" replace />;
    }
    return <Navigate to="/my-assets" replace />;
  }

  return children;
};

export default PublicRoute;
