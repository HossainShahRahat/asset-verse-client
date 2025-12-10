import { useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const MyEmployeeList = () => {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      pic: "https://i.pravatar.cc/150?img=1",
      type: "employee",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      pic: "https://i.pravatar.cc/150?img=5",
      type: "employee",
    },
  ]);

  const removeEmployee = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This person will be removed from your team",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTeam = team.filter((member) => member.id !== id);
        setTeam(newTeam);
        Swal.fire("Removed!", "Employee removed successfully.", "success");
      }
    });
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Team</h2>
        <div className="badge badge-lg badge-primary">Total: {team.length}</div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.map((person) => (
              <tr key={person.id} className="hover">
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={person.pic} alt={person.name} />
                    </div>
                  </div>
                </td>
                <td className="font-bold">{person.name}</td>
                <td>{person.email}</td>
                <td>
                  <span className="badge badge-ghost">Employee</span>
                </td>
                <td>
                  <button
                    onClick={() => removeEmployee(person.id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
