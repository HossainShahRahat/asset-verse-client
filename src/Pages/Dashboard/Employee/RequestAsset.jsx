import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

const RequestAsset = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const getAssets = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/assets?search=${search}`,
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
    };
    getAssets();
  }, [search]);

  const submitRequest = async (e) => {
    e.preventDefault();
    const note = e.target.note.value;

    const info = {
      assetId: active._id,
      assetName: active.productName,
      assetType: active.productType,
      requesterName: user.displayName,
      requesterEmail: user.email,
      hrEmail: active.hrEmail,
      requestDate: new Date(),
      note: note,
      status: "pending",
    };

    try {
      await axios.post("http://localhost:5000/requests", info, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      Swal.fire("Success", "Request sent", "success");
      setActive(null);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to send request", "error");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const filteredItems = items.filter((item) => {
    if (filter === "available") return item.availableQuantity > 0;
    if (filter === "stock_out") return item.availableQuantity === 0;
    return true;
  });

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Request Assets</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <form onSubmit={handleSearch} className="join w-full md:w-auto">
          <input
            type="text"
            name="search"
            placeholder="Search..."
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
          <option value="available">Available</option>
          <option value="stock_out">Out of Stock</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={item.productImage}
                  alt="asset"
                  className="rounded-xl h-48 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.productName}</h2>
                <p>Type: {item.productType}</p>
                <p
                  className={`font-bold ${
                    item.availableQuantity === 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {item.availableQuantity > 0 ? "Available" : "Out of Stock"}
                </p>
                <div className="card-actions">
                  <button
                    className="btn btn-primary"
                    disabled={item.availableQuantity === 0}
                    onClick={() => setActive(item)}
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {active && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Request {active.productName}</h3>
            <p className="py-4">Add a note for the HR.</p>

            <form onSubmit={submitRequest}>
              <textarea
                name="note"
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Reason..."
              ></textarea>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setActive(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
