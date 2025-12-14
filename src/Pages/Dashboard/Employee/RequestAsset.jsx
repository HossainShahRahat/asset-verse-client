import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaSearch, FaFilter } from "react-icons/fa";

const RequestAsset = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const [assetsRes, requestsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/assets?search=${search}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }),
          axios.get(
            `${import.meta.env.VITE_API_URL}/requests?email=${user.email}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          ),
        ]);

        const availableAssets = assetsRes.data.filter(
          (item) => item.productQuantity > 0
        );
        setAssets(availableAssets);

        const requestedAssetIds = requestsRes.data.map((req) => req.assetId);
        setMyRequests(requestedAssetIds);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (user?.email) {
      getData();
    }
  }, [search, user?.email]);

  const handleRequest = (asset) => {
    const requestInfo = {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      assetImage: asset.productImage,
      requesterEmail: user.email,
      requesterName: user.displayName,
      requestDate: new Date(),
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      companyLogo: asset.companyLogo,
      status: "pending",
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/requests`, requestInfo, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Asset requested successfully!", "success");
          setMyRequests([...myRequests, asset._id]);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Could not request asset.", "error");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen text-base-content">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">Request Assets</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-base-100 p-4 rounded-xl shadow-sm">
        <form onSubmit={handleSearch} className="join w-full md:w-auto">
          <input
            type="text"
            name="search"
            placeholder="Search assets..."
            className="input input-bordered join-item w-full md:w-64"
          />
          <button className="btn btn-neutral join-item">
            <FaSearch />
          </button>
        </form>

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading assets...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No assets available to request.
                </td>
              </tr>
            ) : (
              assets
                .filter((item) => (filter ? item.productType === filter : true))
                .map((item) => {
                  const isAlreadyRequested = myRequests.includes(item._id);
                  return (
                    <tr key={item._id} className="hover">
                      <td className="font-bold text-lg">{item.productName}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.productType === "Returnable"
                              ? "badge-primary"
                              : "badge-secondary"
                          } badge-outline`}
                        >
                          {item.productType}
                        </span>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            item.productQuantity > 0
                              ? "badge-accent"
                              : "badge-error"
                          } gap-2`}
                        >
                          {item.productQuantity > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRequest(item)}
                          className="btn btn-sm btn-primary"
                          disabled={
                            item.productQuantity === 0 || isAlreadyRequested
                          }
                        >
                          {isAlreadyRequested ? "Requested" : "Request"}
                        </button>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAsset;
