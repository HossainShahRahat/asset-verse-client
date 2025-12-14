import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const AllRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(0);

  const fetchRequests = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/hr-requests/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      setRequests(res.data);
      setLoading(false);

      setTotalPages(Math.ceil(res.data.length / limit));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user, page]);

  const handleAction = (id, action) => {
    Swal.fire({
      title: `Confirm ${action}?`,
      text: `Are you sure you want to ${action} this request?`,
      icon: action === "approve" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const requestToUpdate = requests.find((r) => r._id === id);
        if (!requestToUpdate) return;

        const updateData = {
          status: action,
          assetId: requestToUpdate.assetId,
          requesterEmail: requestToUpdate.requesterEmail,
          requesterName: requestToUpdate.requesterName,
          hrEmail: requestToUpdate.hrEmail,
          companyName: requestToUpdate.companyName,
          companyLogo: requestToUpdate.companyLogo,
        };

        axios
          .patch(`${import.meta.env.VITE_API_URL}/requests/${id}`, updateData, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                `${action}d!`,
                `The request has been successfully ${action}d.`,
                "success"
              );
              fetchRequests();
            } else if (res.data.message === "limit reached") {
              Swal.fire(
                "Limit Reached",
                "You cannot approve this request because your employee limit has been reached.",
                "error"
              );
            } else if (
              res.data.message === "Forbidden: You do not own this request."
            ) {
              Swal.fire(
                "Forbidden",
                "You are not authorized to manage this request.",
                "error"
              );
            } else {
              Swal.fire("Error", "Failed to update request status.", "error");
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "An error occurred during the update.", "error");
          });
      }
    });
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRequests = filteredRequests.slice(
    page * limit,
    (page + 1) * limit
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge badge-warning text-black">Pending</span>;
      case "approved":
        return <span className="badge badge-success text-white">Approved</span>;
      case "rejected":
        return <span className="badge badge-error text-white">Rejected</span>;
      default:
        return <span className="badge badge-neutral">Unknown</span>;
    }
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen text-base-content">
      <h2 className="text-3xl font-bold mb-8">
        All Asset Requests ({requests.length})
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name or asset"
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Requester Email</th>
              <th>Requester Name</th>
              <th>Request Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-8">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </td>
              </tr>
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-8">
                  No requests found for your company.
                </td>
              </tr>
            ) : (
              displayedRequests.map((request) => (
                <tr key={request._id} className="hover">
                  <td className="font-bold">{request.assetName}</td>
                  <td>
                    <span
                      className={`badge ${
                        request.assetType === "Returnable"
                          ? "badge-info"
                          : "badge-secondary"
                      } text-white`}
                    >
                      {request.assetType}
                    </span>
                  </td>
                  <td>{request.requesterEmail}</td>
                  <td>{request.requesterName}</td>
                  <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td className="text-center space-x-2">
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(request._id, "approved")}
                          className="btn btn-success btn-sm text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(request._id, "rejected")}
                          className="btn btn-error btn-sm text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.status === "approved" &&
                      request.assetType === "Returnable" && (
                        <button
                          onClick={() => handleAction(request._id, "returned")}
                          className="btn btn-warning btn-sm text-white"
                        >
                          Return
                        </button>
                      )}
                    {(request.status === "rejected" ||
                      (request.status === "approved" &&
                        request.assetType === "Non-returnable") ||
                      request.status === "returned") && (
                      <button className="btn btn-sm btn-disabled">
                        Action Taken
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="btn btn-ghost"
          >
            Previous
          </button>
          <span className="btn btn-ghost mx-2">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
            className="btn btn-ghost"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllRequests;
