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
            `http://localhost:5000/requests?email=${user.email}&search=${search}`,
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
          .delete(`http://localhost:5000/requests/${id}`, {
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
        };

        axios
          .patch(`http://localhost:5000/requests/${item._id}`, info, {
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
        <form onSubmit={handleSearch} className="join">
          <input
            type="text"
            name="search"
            placeholder="Search asset name..."
            className="input input-bordered join-item"
          />
          <button className="btn btn-primary join-item">
            <FaSearch />
          </button>
        </form>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="returned">Returned</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : displayedItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No assets found
                </td>
              </tr>
            ) : (
              displayedItems.map((item) => (
                <tr key={item._id} className="hover">
                  <td className="font-bold">{item.assetName}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.assetType === "Returnable"
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {item.assetType}
                    </span>
                  </td>
                  <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                  <td>
                    {item.actionDate
                      ? new Date(item.actionDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {item.status === "pending" ? (
                      <span className="badge badge-warning">Pending</span>
                    ) : item.status === "approved" ? (
                      <span className="badge badge-success">Approved</span>
                    ) : item.status === "returned" ? (
                      <span className="badge badge-neutral">Returned</span>
                    ) : (
                      <span className="badge badge-error">Rejected</span>
                    )}
                  </td>
                  <td>
                    {item.status === "pending" && (
                      <button
                        onClick={() => cancel(item._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Cancel
                      </button>
                    )}
                    {item.status === "approved" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => printDetails(item)}
                          className="btn btn-sm btn-info text-white"
                        >
                          <FaFilePdf />
                        </button>
                        {item.assetType === "Returnable" && (
                          <button
                            onClick={() => returnAsset(item)}
                            className="btn btn-sm btn-warning"
                          >
                            Return
                          </button>
                        )}
                      </div>
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

export default MyAssets;
