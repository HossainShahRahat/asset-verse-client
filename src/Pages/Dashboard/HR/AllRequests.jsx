import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllRequests = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `http://localhost:5000/requests?email=${user.email}&search=${search}&page=${page}&limit=10`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then((res) => {
          setItems(res.data);
        });
    }
  }, [user, search, page]);

  const approve = (req) => {
    const info = {
      status: "approved",
      assetId: req.assetId,
      requesterEmail: req.requesterEmail,
      requesterName: req.requesterName,
      hrEmail: user.email,
      companyName: user.companyName,
      companyLogo: user.companyLogo,
    };

    axios
      .patch(`http://localhost:5000/requests/${req._id}`, info, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        if (res.data.message === "limit reached") {
          Swal.fire({
            title: "Limit Reached",
            text: "Please upgrade your package to add more employees.",
            icon: "warning",
            confirmButtonText: "Upgrade Now",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/upgrade-package");
            }
          });
          return;
        }

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Request approved", "success");
          const remaining = items.filter((item) => item._id !== req._id);
          const updated = items.find((item) => item._id === req._id);
          updated.status = "approved";
          setItems([updated, ...remaining]);
        }
      });
  };

  const reject = (id) => {
    Swal.fire({
      title: "Reject?",
      text: "You cannot undo this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `http://localhost:5000/requests/${id}`,
            { status: "rejected" },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Rejected", "Request has been rejected", "success");
              const remaining = items.filter((item) => item._id !== id);
              const updated = items.find((item) => item._id === id);
              updated.status = "rejected";
              setItems([updated, ...remaining]);
            }
          });
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
    setPage(0);
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">All Requests</h2>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="join">
          <input
            type="text"
            name="search"
            placeholder="Search by name or email"
            className="input input-bordered join-item w-80"
          />
          <button className="btn btn-primary join-item">Search</button>
        </form>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Email</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="hover">
                <td className="font-bold">{item.assetName}</td>
                <td>{item.assetType}</td>
                <td>{item.requesterEmail}</td>
                <td>{item.requesterName}</td>
                <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                <td>
                  {item.status === "pending" ? (
                    <span className="badge badge-warning">Pending</span>
                  ) : item.status === "approved" ? (
                    <span className="badge badge-success">Approved</span>
                  ) : (
                    <span className="badge badge-error">Rejected</span>
                  )}
                </td>
                <td>
                  {item.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approve(item)}
                        className="btn btn-xs btn-success text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => reject(item._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8 join">
        <button
          onClick={() => setPage(page > 0 ? page - 1 : 0)}
          className="join-item btn"
        >
          «
        </button>
        <button className="join-item btn">Page {page + 1}</button>
        <button
          onClick={() => setPage(page + 1)}
          className="join-item btn"
          disabled={items.length < 10}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default AllRequests;
