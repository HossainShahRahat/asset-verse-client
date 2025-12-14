import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}my-team/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const teamMembers = res.data.filter(
        (member) => member.employeeEmail !== user.email
      );
      setEmployees(teamMembers);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [user]);

  const handleRemoveEmployee = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove ${name} from your team.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove them!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}my-team/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Removed!",
                `${name} has been removed from the team.`,
                "success"
              );
              fetchEmployees();
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Could not remove employee.", "error");
          });
      }
    });
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen text-base-content">
      <h2 className="text-3xl font-bold mb-8">
        My Employee List ({employees.length})
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-8">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8">
                  No employees have joined your team yet.
                </td>
              </tr>
            ) : (
              employees.map((member) => (
                <tr key={member._id} className="hover">
                  <td className="font-bold">{member.employeeName}</td>
                  <td>{member.employeeEmail}</td>
                  <td>
                    <div className="badge badge-outline badge-info capitalize">
                      {member.role}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleRemoveEmployee(member._id, member.employeeName)
                      }
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaUserTimes /> Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
