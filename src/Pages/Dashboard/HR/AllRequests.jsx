import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/requests")
      .then((res) => {
        setAllRequests(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    axios
      .patch(`http://localhost:5000/requests/${id}`, { status: "approved" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Request approved successfully", "success");
          const remaining = allRequests.filter((req) => req._id !== id);
          const updated = allRequests.find((req) => req._id === id);
          updated.status = "approved";
          setAllRequests([updated, ...remaining]);
        }
      });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/requests/${id}`, { status: "rejected" })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Rejected!",
                "The request has been rejected.",
                "success"
              );
              const remaining = allRequests.filter((req) => req._id !== id);
              const updated = allRequests.find((req) => req._id === id);
              updated.status = "rejected";
              setAllRequests([updated, ...remaining]);
            }
          });
      }
    });
  };

  if (loading) {
    return <div className="p-10 text-center">Loading requests...</div>;
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Asset Requests</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Requester Email</th>
              <th>Requester Name</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50 border-b">
                <td className="font-medium">{request.assetName}</td>
                <td>{request.assetType}</td>
                <td>{request.requesterEmail}</td>
                <td>{request.requesterName}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>
                  {request.status === "pending" ? (
                    <span className="badge badge-warning text-white">
                      Pending
                    </span>
                  ) : request.status === "approved" ? (
                    <span className="badge badge-success text-white">
                      Approved
                    </span>
                  ) : (
                    <span className="badge badge-error text-white">
                      Rejected
                    </span>
                  )}
                </td>
                <td>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="btn btn-sm btn-success text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {allRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
