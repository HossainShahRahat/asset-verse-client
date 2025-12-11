import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const MyEmployeeList = () => {
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeam = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/my-team/${user.email}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );
          setTeam(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };
    getTeam();
  }, [user]);

  const remove = (id) => {
    Swal.fire({
      title: "Remove member?",
      text: "This will remove them from your team",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/my-team/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Removed!", "Member has been removed.", "success");
              const remaining = team.filter((member) => member._id !== id);
              setTeam(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Team</h2>
        <div className="badge badge-lg badge-primary">
          Total: {team.length} Members
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading team...
                </td>
              </tr>
            ) : team.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No team members found.
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr key={member._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            member.companyLogo ||
                            "https://i.ibb.co/mJRkLW9/avatar.png"
                          }
                          alt={member.employeeName}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{member.employeeName}</div>
                    <div className="text-sm opacity-50">
                      {member.employeeEmail}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">Employee</span>
                  </td>
                  <td>
                    <button
                      onClick={() => remove(member._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      <FaTrashAlt /> Remove
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
