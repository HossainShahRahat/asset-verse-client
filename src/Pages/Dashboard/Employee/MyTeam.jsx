import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";

const MyTeam = () => {
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeam = async () => {
      if (user?.email) {
        setLoading(true);
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

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Team Members</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : team.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No members found
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr key={member._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            member.companyLogo ||
                            "https://i.ibb.co/mJRkLW9/avatar.png"
                          }
                          alt="avatar"
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
                    {member.employeeEmail === user.email && (
                      <span className="ml-2 badge badge-info badge-sm">
                        You
                      </span>
                    )}
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

export default MyTeam;
