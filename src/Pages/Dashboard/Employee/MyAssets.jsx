import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaFilePdf, FaSearch } from "react-icons/fa";

const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (user?.email) {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/requests?email=${
              user.email
            }&search=${search}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );
          setItems(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };
    getData();
  }, [user, search]);

  const cancel = (id) => {
    Swal.fire({
      title: "Cancel Request?",
      text: "This will remove the request permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/requests/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Cancelled", "Request removed", "success");
              const remaining = items.filter((item) => item._id !== id);
              setItems(remaining);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 403) {
              Swal.fire("Forbidden", error.response.data.message, "error");
            } else {
              Swal.fire("Error", "Could not cancel request.", "error");
            }
          });
      }
    });
  };

  const returnAsset = (item) => {
    if (item.assetType !== "Returnable") return;

    Swal.fire({
      title: "Return Asset?",
      text: "The item will be marked as returned",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, return it",
    }).then((result) => {
      if (result.isConfirmed) {
        const info = {
          status: "returned",
          assetId: item.assetId,
          requesterEmail: user.email,
          hrEmail: item.hrEmail,
        };

        axios
          .patch(`${import.meta.env.VITE_API_URL}/requests/${item._id}`, info, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Returned", "Asset marked as returned", "success");
              const updated = items.map((i) => {
                if (i._id === item._id) {
                  return { ...i, status: "returned" };
                }
                return i;
              });
              setItems(updated);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 403) {
              Swal.fire(
                "Forbidden",
                error.response.data.message || "Unauthorized",
                "error"
              );
            } else {
              Swal.fire("Error", "Could not process return.", "error");
            }
          });
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const printDetails = (item) => {
    Swal.fire({
      title: "Asset Details",
      html: `
                <div class="text-left">
                    <p><strong>Product:</strong> ${item.assetName}</p>
                    <p><strong>Type:</strong> ${item.assetType}</p>
                    <p><strong>Approved Date:</strong> ${new Date(
                      item.actionDate
                    ).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> Approved</p>
                </div>
            `,
      icon: "info",
    });
  };

  const displayedItems = filter
    ? items.filter((item) => item.status === filter)
    : items;

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">My Assets</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <form onSubmit={handleSearch} className="join w-full md:w-auto">
          <input
            type="text"
            name="search"
            placeholder="Search asset name..."
            className="input input-bordered join-item w-full md:w-80"
          />
          <button className="btn btn-primary join-item">
            <FaSearch />
          </button>
        </form>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full md:w-auto"
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="returned">Returned</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : displayedItems.length === 0 ? (
        <div className="text-center p-10 text-xl font-semibold opacity-70">
          No assets found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl border border-base-300"
            >
              <figure className="h-48 w-full bg-base-300">
                <img
                  src={
                    item.assetImage ||
                    "https://img.icons8.com/color/96/no-image.png"
                  }
                  alt={item.assetName}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-xl font-bold">
                    {item.assetName}
                  </h2>
                  <span
                    className={`badge ${
                      item.assetType === "Returnable"
                        ? "badge-info"
                        : "badge-ghost"
                    }`}
                  >
                    {item.assetType}
                  </span>
                </div>

                <div className="space-y-2 mt-2 text-sm">
                  <p className="flex justify-between">
                    <span className="font-semibold opacity-70">
                      Request Date:
                    </span>
                    <span>
                      {new Date(item.requestDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold opacity-70">
                      Approval Date:
                    </span>
                    <span>
                      {item.actionDate
                        ? new Date(item.actionDate).toLocaleDateString()
                        : "-"}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-semibold opacity-70">Status:</span>
                    {item.status === "pending" ? (
                      <span className="badge badge-warning badge-sm">
                        Pending
                      </span>
                    ) : item.status === "approved" ? (
                      <span className="badge badge-success badge-sm">
                        Approved
                      </span>
                    ) : item.status === "returned" ? (
                      <span className="badge badge-neutral badge-sm">
                        Returned
                      </span>
                    ) : (
                      <span className="badge badge-error badge-sm">
                        Rejected
                      </span>
                    )}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  {item.status === "pending" && (
                    <button
                      onClick={() => cancel(item._id)}
                      className="btn btn-sm btn-error text-white w-full"
                    >
                      Cancel Request
                    </button>
                  )}
                  {item.status === "approved" && (
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => printDetails(item)}
                        className="btn btn-sm btn-info text-white flex-1"
                        title="Print Details"
                      >
                        <FaFilePdf /> Details
                      </button>
                      {item.assetType === "Returnable" && (
                        <button
                          onClick={() => returnAsset(item)}
                          className="btn btn-sm btn-warning flex-1"
                        >
                          Return
                        </button>
                      )}
                    </div>
                  )}
                  {(item.status === "rejected" ||
                    item.status === "returned") && (
                    <button className="btn btn-sm btn-disabled w-full">
                      No Action Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAssets;
