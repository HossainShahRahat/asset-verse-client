import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const AssetList = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (user?.email) {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/assets?email=${
              user.email
            }&search=${search}&sort=${sort}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );
          setAssets(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };
    getData();
  }, [user, search, sort]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/assets/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your asset has been deleted.", "success");
              const remaining = assets.filter((item) => item._id !== id);
              setAssets(remaining);
            }
          });
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">Asset List</h2>

        <Link to="/add-asset" className="btn btn-primary">
          <FaPlus /> Add New Asset
        </Link>
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
          <span className="font-semibold">Sort by Quantity:</span>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Product Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No assets found
                </td>
              </tr>
            ) : (
              assets.map((item) => (
                <tr key={item._id} className="hover">
                  <td className="font-bold">{item.productName}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.productType === "Returnable"
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {item.productType}
                    </span>
                  </td>
                  <td
                    className={
                      item.productQuantity < 5 ? "text-red-500 font-bold" : ""
                    }
                  >
                    {item.productQuantity}
                  </td>
                  <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-square btn-ghost text-blue-600">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-square btn-ghost text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default AssetList;
