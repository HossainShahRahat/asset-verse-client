import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (user) {
      axios
        .get(`http://localhost:5000/user/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setRole(res.data.role);
          setRoleLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRoleLoading(false);
        });
    } else {
      setTimeout(() => {
        setRoleLoading(false);
      }, 0);
    }
  }, [user, loading]);

  return [role, roleLoading];
};

export default useRole;
