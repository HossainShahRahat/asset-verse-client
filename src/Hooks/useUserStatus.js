import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";

const useUserStatus = () => {
  const { user, loading } = useContext(AuthContext);
  const [status, setStatus] = useState({ role: null, limit: null, type: null });
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setStatus({
            role: res.data.role,
            limit: res.data.packageLimit,
            type: res.data.subscription || "Basic",
          });
          setStatusLoading(false);
        })
        .catch(() => {
          setStatus({ role: null, limit: null, type: null });
          setStatusLoading(false);
        });
    } else {
      setStatus({ role: null, limit: null, type: null });
      setStatusLoading(false);
    }
  }, [user, loading]);

  return [status.role, statusLoading, status];
};

export default useUserStatus;
