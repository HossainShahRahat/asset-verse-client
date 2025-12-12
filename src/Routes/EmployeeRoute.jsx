import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useRole from "../Hooks/useRole";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (user && role === "employee") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default EmployeeRoute;
